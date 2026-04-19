import React, { useState, useRef } from 'react';
import { useStore } from '../store/StoreContext';
import { Upload, X, Asterisk, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeItemRarity } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

export function AddItemView({ onComplete }: { onComplete: () => void }) {
  const { addItem } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; file: File } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida (PNG, JPG, etc).');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage({
        url: e.target?.result as string,
        file
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeItemRarity(selectedImage.url, selectedImage.file.type);
      
      const newItem = {
        id: uuidv4(),
        photoBase64: selectedImage.url,
        name: result.name,
        rarityCategory: result.rarityCategory,
        rarityScore: result.rarityScore,
        description: result.description,
        estimatedValue: result.estimatedValue,
        createdAt: Date.now(),
      };
      
      await addItem(newItem);
      onComplete(); // Go back to collection
    } catch (err: any) {
      setError(err.message || "Erro ao analisar a imagem. Verifique se o item está visível.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">Insira o Objeto</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Qual a próxima <b className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">relíquia?</b>
        </h1>
        <p className="text-slate-400">A Inteligência Artificial fará a análise completa de raridade.</p>
      </div>

      {!selectedImage ? (
        <label 
          className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${
            dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-slate-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-slate-400" />
            </div>
            <p className="mb-2 text-sm text-slate-300"><span className="font-semibold text-white">Clique para enviar</span> ou arraste uma foto</p>
            <p className="text-xs text-slate-500">SVG, PNG, JPG ou GIF (Max. 5MB)</p>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleChange} 
          />
        </label>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-4xl p-2 max-w-xl mx-auto w-full overflow-hidden flex flex-col relative">
           <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            disabled={isAnalyzing}
           >
             <X className="w-5 h-5" />
           </button>
           
           <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-black">
             <img src={selectedImage.url} className="w-full h-full object-contain" alt="Preview" />
             
             {isAnalyzing && (
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                 <Asterisk className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
                 <p className="text-white font-mono text-sm tracking-wider uppercase animate-pulse">Scanning Rarity...</p>
               </div>
             )}
           </div>
           
           <div className="p-6 pb-4">
             <button
               onClick={handleAnalyze}
               disabled={isAnalyzing}
               className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
             >
               {isAnalyzing ? (
                 <>Analisando...</>
               ) : (
                 <><Sparkles className="w-5 h-5" /> Confirmar e Analisar</>
               )}
             </button>
           </div>
        </div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center gap-2 text-red-400 bg-red-400/10 py-3 px-6 rounded-full max-w-fit mx-auto"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
        </motion.div>
      )}
    </div>
  );
}
