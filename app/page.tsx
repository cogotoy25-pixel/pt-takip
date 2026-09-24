export const dynamic = 'force-dynamic';
export const revalidate = 0;

'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Bağlantısı
const supabaseUrl = 'https://eeqevfkdnrfcnexwrai.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcWV2ZmtkbnJmY25leHdyYWkiLCJyb2xlIjoiYW5vbiIsInJpYXQiOjI2NDFfaDYycyDqYDIq4'; 
const supabase = createClient(supabaseUrl, supabaseKey);

interface ExerciseItem {
  id: string;
  name: string;
  superset?: string;
  setInfo: string;
  tempo: string;
  rest: string;
  note: string;
  youtubeQuery: string;
}

interface WorkoutDay {
  dayName: string;
  subtitle: string;
  exercises: ExerciseItem[];
}

const workoutData: Record<string, WorkoutDay> = {
  gunA: {
    dayName: 'GÜN A: TÜM VÜCUT (DİZ DOMİNANT • İTİŞ/ÇEKİŞ)',
    subtitle: 'Hyrox Entegrasyonlu Performans Takibi',
    exercises: [
      { id: 'a1', name: 'Goblet Squat', superset: 'A2 Floor Press', setInfo: '4 × 8-10', tempo: '3 sn in, 1 sn dur, 1 sn kalk', rest: '75 sn', note: 'Dumbbell göğüse yapışık, dizler dizlerin içine insin. A2 ile dönüşümlü.', youtubeQuery: 'Goblet Squat form' },
      { id: 'a2', name: 'Dumbbell Floor Press', superset: 'A1 Goblet Squat', setInfo: '4 × 10-12', tempo: '2 sn in, dirsek yerde 1 sn dur, kalk', rest: '75 sn', note: 'Dirsekler yerde kısa duruş, patlayıcı kalkış.', youtubeQuery: 'Dumbbell Floor Press form' },
      { id: 'b1', name: 'Bulgarian Split Squat', superset: 'B2 Dumbbell Row', setInfo: '3 × 10-12 (her bacak)', tempo: '3 sn in, tepeye kalk', rest: '60 sn', note: 'Gövde hafif önde, ön bacak ağırlıklı.', youtubeQuery: 'Bulgarian Split Squat form' },
      { id: 'b2', name: 'Dumbbell Row', superset: 'B1 Bulgarian Split Squat', setInfo: '3 × 10-12', tempo: '1 sn çek, 2 sn bırak', rest: '60 sn', note: 'Sırtı düz tut, kürek kemiklerini sıkıştır.', youtubeQuery: 'Dumbbell Row form' },
      { id: 'c1', name: 'Kettlebell Romanian Deadlift (RDL)', superset: 'C2 Lateral Raise', setInfo: '3 × 12-15', tempo: '3 sn yavaşça in, kalça sık', rest: '60 sn', note: 'Dizler hafif kırık, kalçayı geriye it.', youtubeQuery: 'Kettlebell Romanian Deadlift form' },
      { id: 'c2', name: 'Dumbbell Lateral Raise', superset: 'C1 Kettlebell RDL', setInfo: '3 × 15', tempo: '1 sn kaldır, 2 sn yavaş indir', rest: '45 sn', note: 'Omuz başlarıyla kaldır, serçe parmak hafif yukarı.', youtubeQuery: 'Dumbbell Lateral Raise form' },
      { id: 'd', name: 'Copenhagen Plank', setInfo: '3 × 15-20 sn (her bacak)', tempo: 'İzometrik tutuş', rest: '45 sn', note: 'Direkt kaldırma, gövdeyi düz tut, iç bacak aktif.', youtubeQuery: 'Copenhagen Plank form' },
    ],
  },
  gunB: {
    dayName: 'GÜN B: TÜM VÜCUT (KALÇA/POSTERİOR • ÜST VÜCUT)',
    subtitle: 'Hyrox Entegrasyonlu Performans Takibi',
    exercises: [
      { id: 'b_a1', name: 'Dumbbell Sumo Deadlift', superset: 'A2 Overhead Press', setInfo: '4 × 10-12', tempo: '3 sn in, kalçayla kalk', rest: '75 sn', note: 'Ayaklar geniş, göğüs dik, kalçayı aktif kullan.', youtubeQuery: 'Dumbbell Sumo Deadlift form' },
      { id: 'b_a2', name: 'Dumbbell Overhead Press (OHP)', superset: 'A1 Sumo Deadlift', setInfo: '4 × 8-10', tempo: '2 sn kaldır, 2 sn indir', rest: '75 sn', note: 'Karın sıkı, bel çukurunu koru.', youtubeQuery: 'Dumbbell Overhead Press form' },
      { id: 'b_b1', name: 'Dumbbell Step-Up', superset: 'B2 Lat Pulldown / Çekiş', setInfo: '3 × 10 (her bacak)', tempo: 'Kontrollü çıkış ve iniş', rest: '60 sn', note: 'Ön bacaktan güç al, arkadan destek alma.', youtubeQuery: 'Dumbbell Step Up form' },
      { id: 'b_b2', name: 'Dumbbell Renegade Row', superset: 'B1 Step-Up', setInfo: '3 × 8-10 (her kol)', tempo: 'Dengeli çekiş', rest: '60 sn', note: 'Kalçayı döndürme, gövdeyi yere paralel tut.', youtubeQuery: 'Dumbbell Renegade Row form' },
      { id: 'b_c1', name: 'Dumbbell Glute Bridge', superset: 'C2 Biceps/Triceps', setInfo: '3 × 15', tempo: '1 sn kalk, tepede 2 sn sık', rest: '45 sn', note: 'Topuklardan güç al, kalçayı tepeye kilitle.', youtubeQuery: 'Dumbbell Glute Bridge form' },
      { id: 'b_c2', name: 'Dumbbell Biceps Curl to Overhead Press', superset: 'C1 Glute Bridge', setInfo: '3 × 12', tempo: 'Akıcı geçiş', rest: '45 sn', note: 'Bilekleri döndürerek yukarı it.', youtubeQuery: 'Dumbbell Biceps Curl to Overhead Press form' },
      { id: 'b_d', name: 'Dead Bug', setInfo: '3 × 10 tekrar (her bacak)', tempo: 'Yavaş ve kontrollü', rest: '45 sn', note: 'Belini tamamen yere yapıştır, boşluk bırakma.', youtubeQuery: 'Dead Bug form' },
    ],
  },
};

export default function PTApp() {
  const [activeTab, setActiveTab] = useState<'program' | 'coach'>('program');
  const [selectedDay, setSelectedDay] = useState<'gunA' | 'gunB'>('gunA');
  const [studentName, setStudentName] = useState('Halime Yasak');
  const [coachNote, setCoachNote] = useState('');
  const [inputs, setInputs] = useState<Record<string, Record<number, { kg: string; tekrar: string; zorluk: string }>>>({});
  
  // Antrenör Yetkisi State'i
  const [isCoach, setIsCoach] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);
  
  // Kronometre State'i
  const [restTime, setRestTime] = useState<number | null>(null);

  const currentWorkout = workoutData[selectedDay];

  // Gizli Link Kontrolü
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('yetki') === 'koc') {
      localStorage.setItem('isCoach', 'true');
      setIsCoach(true);
    } else if (localStorage.getItem('isCoach') === 'true') {
      setIsCoach(true);
    }
  }, []);

  // Kadın Sesi Hazırlığı (Tarayıcının sesleri yüklemesini bekler)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const playWarningSound = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Yeni set için hazırlan.");
      utterance.lang = 'tr-TR';
      utterance.rate = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const turkishVoices = voices.filter(v => v.lang.includes('tr'));
      // Varsa kadın sesini bulmaya çalış, yoksa varsayılanı kullan
      const femaleVoice = turkishVoices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('Yelda')) || turkishVoices[0];
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (restTime === null || restTime <= 0) return;
    const timer = setInterval(() => {
      setRestTime((prev) => {
        if (prev === 11) playWarningSound();
        return prev ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [restTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleInputChange = (exerciseId: string, setNo: number, field: 'kg' | 'tekrar' | 'zorluk', value: string) => {
    setInputs(prev => ({
      ...prev,
      [exerciseId]: {
        ...(prev[exerciseId] || {}),
        [setNo]: {
          kg: prev[exerciseId]?.[setNo]?.kg || '',
          tekrar: prev[exerciseId]?.[setNo]?.tekrar || '',
          zorluk: prev[exerciseId]?.[setNo]?.zorluk || '',
          [field]: value
        }
      }
    }));
  };

  // Akıllı Bitir Butonu (Kronometreyi Başlatır)
  const handleBitir = (restString: string) => {
    const seconds = parseInt(restString.replace(/\D/g, ''));
    if (!isNaN(seconds)) {
      setRestTime(seconds);
    }
  };

  const saveWorkoutToSupabase = async () => {
    try {
      const workoutPayload = currentWorkout.exercises.map(ex => ({
        exercise: ex.name,
        sets: [1, 2, 3, 4].map(setNo => ({
          set_no: setNo,
          kg: inputs[ex.id]?.[setNo]?.kg || 'BOŞ',
          tekrar: inputs[ex.id]?.[setNo]?.tekrar || 'BOŞ',
          zorluk: inputs[ex.id]?.[setNo]?.zorluk || 'BOŞ'
        }))
      }));

      await supabase.from('tamamlanmis_antrenmanlar').insert([
        {
          ogrenci_adi: studentName,
          antrenman_gunu: currentWorkout.dayName.split(':')[0],
          antrenman_verileri: workoutPayload,
          koc_notu: coachNote || 'Not yok'
        }
      ]);
      alert('Antrenman Başarıyla Kaydedildi!');
    } catch (err) {
      alert('Kayıt sırasında hata oluştu.');
    }
  };

  useEffect(() => {
    if (activeTab === 'coach' && isCoach) {
      supabase
        .from('tamamlanmis_antrenmanlar')
        .select('*')
        .order('oluşturulma_tarihi', { ascending: false })
        .then(({ data }) => {
          if (data) setSavedWorkouts(data);
        });
    }
  }, [activeTab, isCoach]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* Yüzen Aktif Kronometre */}
      {restTime !== null && restTime > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-900 border border-blue-500 shadow-2xl rounded-full px-6 py-3 z-50 flex items-center gap-4 text-white">
          <span className="animate-pulse text-xl">⏱️</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-blue-200 font-bold leading-none">DİNLENME</span>
            <span className="font-extrabold text-xl leading-none">{formatTime(restTime)}</span>
          </div>
          <button 
            onClick={() => setRestTime(null)} 
            className="ml-4 bg-blue-800 text-blue-200 hover:text-white text-xs px-3 py-1.5 rounded-full border border-blue-700"
          >
            Geç
          </button>
        </div>
      )}

      {/* Orijinal Mavi Başlık */}
      <div className="bg-[#2a3b68] text-white p-6 rounded-b-3xl mb-4 shadow-md text-center relative max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-1 tracking-wide">KUVVET & HİPERTROFİ</h1>
        <p className="text-xs text-blue-200 mb-6">Hyrox Entegrasyonlu Performans Takibi</p>

        {/* Antrenör Sekmesi (Sadece Gizli Linkle Girene Görünür) */}
        {isCoach && (
          <div className="flex justify-center bg-[#1e2a4a] p-1 rounded-xl w-fit mx-auto mb-4 border border-[#3b4b7a]">
            <button onClick={() => setActiveTab('program')} className={`px-4 py-2 text-xs font-semibold rounded-lg ${activeTab === 'program' ? 'bg-blue-600 text-white' : 'text-blue-300'}`}>Program</button>
            <button onClick={() => setActiveTab('coach')} className={`px-4 py-2 text-xs font-semibold rounded-lg ${activeTab === 'coach' ? 'bg-blue-600 text-white' : 'text-blue-300'}`}>📊 Antrenör Paneli</button>
          </div>
        )}

        {/* Gün Seçimi (Orijinal Beyaz Butonlar) */}
        {activeTab === 'program' && (
          <div className="flex justify-center gap-3">
            <button onClick={() => setSelectedDay('gunA')} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${selectedDay === 'gunA' ? 'bg-white text-[#2a3b68]' : 'bg-[#3b4b7a] text-blue-100'}`}>Gün A (Salı)</button>
            <button onClick={() => setSelectedDay('gunB')} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${selectedDay === 'gunB' ? 'bg-white text-[#2a3b68]' : 'bg-[#3b4b7a] text-blue-100'}`}>Gün B (Cuma)</button>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {activeTab === 'program' ? (
          <>
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto outline-none focus:border-blue-500 font-medium" placeholder="Sporcu Adı" />
            </div>

            <div className="mb-6 bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center">
              <h2 className="text-sm font-bold text-slate-700">{currentWorkout.dayName}</h2>
            </div>

            <div className="space-y-6">
              {currentWorkout.exercises.map((ex, idx) => (
                <div key={ex.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  {/* Orijinal Başlık ve Form Butonu (Eski Konum) */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-800 text-base">{idx + 1}. {ex.name}</h3>
                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.youtubeQuery)}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-slate-50 text-blue-600 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-full font-medium transition-colors">
                      Form ...
                    </a>
                  </div>

                  {/* Orijinal Dönüşümlü Set Bildirimi */}
                  {ex.superset && (
                    <div className="flex items-center justify-between bg-[#f0f4ff] border border-[#dbe4ff] rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">🔄</div>
                        <div>
                          <span className="text-[10px] text-blue-500 font-bold block leading-none mb-1">DÖNÜŞÜMLÜ SET</span>
                          <span className="text-xs font-semibold text-slate-700">Sıradaki: {ex.superset}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Orijinal Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                      <span className="text-[10px] text-slate-500 block font-medium">SET × TEKRAR</span>
                      <span className="text-xs font-bold text-slate-700">{ex.setInfo}</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                      <span className="text-[10px] text-slate-500 block font-medium">TEMPO</span>
                      <span className="text-xs font-bold text-slate-700">{ex.tempo}</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                      <span className="text-[10px] text-slate-500 block font-medium">DİNLENME</span>
                      <span className="text-xs font-bold text-slate-700">{ex.rest}</span>
                    </div>
                  </div>

                  {/* Orijinal Not Bölümü */}
                  <div className="text-xs text-slate-600 mb-5 pb-4 border-b border-slate-100">
                    <strong>Not:</strong> {ex.note}
                  </div>

                  {/* Orijinal Tablo Yapısı */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-center text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-100">
                          <th className="pb-3 font-medium w-12">SET</th>
                          <th className="pb-3 font-medium">KG</th>
                          <th className="pb-3 font-medium">TEK</th>
                          <th className="pb-3 font-medium">ZORLUK (1-10)</th>
                          <th className="pb-3 font-medium">DURUM</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[1, 2, 3, 4].map((setNo) => (
                          <tr key={setNo}>
                            <td className="py-3 font-bold text-slate-700">#{setNo}</td>
                            <td className="py-3 px-1">
                              <input type="text" placeholder="0" value={inputs[ex.id]?.[setNo]?.kg || ''} onChange={(e) => handleInputChange(ex.id, setNo, 'kg', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 text-center text-slate-700 font-bold outline-none focus:border-blue-500" />
                            </td>
                            <td className="py-3 px-1">
                              <input type="text" placeholder="0" value={inputs[ex.id]?.[setNo]?.tekrar || ''} onChange={(e) => handleInputChange(ex.id, setNo, 'tekrar', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 text-center text-slate-700 font-bold outline-none focus:border-blue-500" />
                            </td>
                            <td className="py-3 px-1">
                              <input type="text" placeholder="-" value={inputs[ex.id]?.[setNo]?.zorluk || ''} onChange={(e) => handleInputChange(ex.id, setNo, 'zorluk', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 text-center text-slate-700 font-bold outline-none focus:border-blue-500" />
                            </td>
                            <td className="py-3 pl-2">
                              {/* Orijinal Bitir Butonu (Basınca Kronometre Başlar) */}
                              <button onClick={() => handleBitir(ex.rest)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-sm">
                                Bitir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <textarea rows={3} placeholder="Antrenörüne not bırak..." value={coachNote} onChange={(e) => setCoachNote(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500 mb-4 text-slate-700" />
              <button onClick={saveWorkoutToSupabase} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all text-sm">
                Antrenmanı Kaydet
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Sporcu Antrenman Geçmişi</h2>
            {savedWorkouts.map((workout, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between border-b border-slate-100 pb-3 mb-3">
                  <span className="font-bold text-slate-800">{workout.ogrenci_adi} - {workout.antrenman_gunu}</span>
                  <span className="text-xs text-slate-500">{new Date(workout.oluşturulma_tarihi).toLocaleString('tr-TR')}</span>
                </div>
                <div className="text-xs text-slate-600 mb-4 italic">Not: "{workout.koc_notu}"</div>
                {workout.antrenman_verileri?.map((ex: any, i: number) => (
                  <div key={i} className="mb-3 text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <strong className="text-blue-600 block mb-1">{ex.exercise}</strong>
                    <div className="grid grid-cols-4 gap-1">
                      {ex.sets?.map((set: any, sIdx: number) => (
                        <div key={sIdx} className="bg-white p-1 rounded border border-slate-200 text-center">
                          <div className="text-[9px] text-slate-400">S:{set.set_no}</div>
                          <div>{set.kg}kg</div>
                          <div>{set.tekrar}t</div>
                          <div>Z:{set.zorluk}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
