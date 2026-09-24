"use client";
import { useState, useEffect } from "react";
// Supabase kütüphanesini içeri aktarıyoruz
import { createClient } from "@supabase/supabase-js";

// SENİN SUPABASE BİLGİLERİN
const supabaseUrl = "https://eeqevvfkdnrfcnexwrai.supabase.co";
const supabaseKey = "sb_publishable_LqUprQCq9gHbh8rcb9NEtg_7hjWTxa1";
const supabase = createClient(supabaseUrl, supabaseKey);

const exerciseData = {
  // GÜN A
  goblet_squat: { title: "Goblet Squat (Kadeh Squat)", target: "Ön Bacak, Kalça, Core", search: "Goblet Squat perfect form", guide: "<ul><li class='mb-2'>Dumbbell'ı iki elinle göğsünün hemen önünde dik ve sabit tut.</li><li class='mb-2'>Sırtın dik olsun, kalçanı geriye ve aşağıya doğru indir.</li><li class='mb-2'>Dirseklerin dizlerinin tam içine doğru yönelsin.</li><li>Topukları yerden kesmeden kontrollü in ve patlayıcı güçle kalk.</li></ul>" },
  floor_press: { title: "Dumbbell Floor Press", target: "Göğüs, Arka Kol (Triceps)", search: "Dumbbell Floor Press form", guide: "<ul><li class='mb-2'>Sırt üstü yere yat, bel boşluğunu hafif koru, dizler bükük ve ayaklar yerde olsun.</li><li class='mb-2'>Dirsekleri gövdeyle 45 derecelik güvenli bir açıda tut.</li><li class='mb-2'>Ağırlığı kontrollü indir, üst kolların (triceps) yere değdiğinde 1 saniye bekle.</li><li>Ağırlığı yukarıya göğüs kaslarını sıkarak güçlüce bas.</li></ul>" },
  dumbbell_rdl: { title: "Dumbbell RDL", target: "Arka Bacak (Hamstring), Kalça", search: "Dumbbell RDL form tips", guide: "<ul><li class='mb-2'>Harekete dizleri hafif kırarak (kilitleyerek) başla.</li><li class='mb-2'>Hareketi bacakları bükerek değil, kalçayı geriye iterek (menteşe gibi) yap.</li><li class='mb-2'>Sırt dümdüz kalsın, dumbbell'lar kaval kemiğine sürtünecek kadar yakın insin.</li><li>Arka bacakların gerildiğini hissettiğin an kalçayı sıkarak yukarı kalk.</li></ul>" },
  one_arm_row: { title: "One-Arm Dumbbell Row", target: "Kanat (Latissimus), Biceps", search: "One Arm Dumbbell Row perfect form", guide: "<ul><li class='mb-2'>Bir elin ve dizinle sehpaya destek ol, gövdeni yere paralel tut.</li><li class='mb-2'>Ağırlığı göğsüne doğru değil, kalça cebine doğru dirseğini geriye alarak çek.</li><li class='mb-2'>Sırt kasını izole etmek için gövdeni bükmekten/döndürmekten kaçın.</li><li>Tepede 1 saniye sık, ağırlığı yavaşça bırak.</li></ul>" },
  hip_thrust: { title: "Hip Thrust / Glute Bridge", target: "Kalça (Gluteus Maximus)", search: "Hip Thrust vs Glute Bridge form", guide: "<ul><li class='mb-2'>Kürek kemiklerinin alt kısmını sehpaya daya (veya yerde matın üzerinde yap).</li><li class='mb-2'>Ayakların omuz genişliğinde açık, topuklardan güç alacak pozisyonda olsun.</li><li class='mb-2'>Kalçayı yukarı fırlat, tepede 2 saniye boyunca var gücünle kitle.</li><li>Hareketi belini bükerek değil, sadece kalçanı sıkarak yap.</li></ul>" },
  dead_bug: { title: "Dead Bug (Ölü Böcek)", target: "Derin Karın Duvarı, Core", search: "Dead Bug core exercise form", guide: "<ul><li class='mb-2'>Sırtüstü uzan ve bel boşluğunu mata tamamen yapıştır. Belin altından kağıt bile geçmemeli.</li><li class='mb-2'>Kollar yukarıda, dizler 90 derece bükük başla.</li><li class='mb-2'>Sağ kolunu geriye, sol bacağını ileriye doğru kontrollü uzat.</li><li>Uzatma esnasında belin kalkmaya çalışırsa hareketi durdurup toparlan.</li></ul>" },
  copenhagen_plank: { title: "Copenhagen Plank (Short Lever)", target: "İç Bacak (Adductor), Yan Karın", search: "Copenhagen Plank short lever", guide: "<ul><li class='mb-2'>Yan plank pozisyonu al, ancak üstteki bacağının DİZİNİ bench'in üzerine yerleştir.</li><li class='mb-2'>Alttaki bacağını havada tut.</li><li class='mb-2'>Dirseğin omuz hizasında olsun ve gövdeni düz bir çizgi halinde kitle.</li><li>İç bacak kaslarınla vücudunu havada sabit tutarak bekle.</li></ul>" },
  // GÜN B
  dumbbell_deadlift: { title: "Dumbbell Deadlift", target: "Tüm Bacak, Kalça, Sırt", search: "Dumbbell Deadlift form", guide: "<ul><li class='mb-2'>Dumbbell'lar ayak bileklerinin iki yanında yerde olsun.</li><li class='mb-2'>Yerden kalkarken sırtını bükme, göğsünü karşıya göster.</li><li class='mb-2'>Ağırlığı çekerken kollarını kanca gibi kullan, yeri ayaklarınla güçlüce it.</li><li>Her tekrarda ağırlığı yere kontrollü bırakıp hareketi sıfırdan başlat.</li></ul>" },
  pushup_eccentric: { title: "Push-Up Eccentric (Negatif)", target: "Göğüs, Triceps, Ön Omuz", search: "Eccentric Push Up negative form", guide: "<ul><li class='mb-2'>Tam nizami şınav pozisyonu al (ayak parmak uçlarında).</li><li class='mb-2'>Gövdeni bir tahta gibi dümdüz tutarak 4-5 saniyede, çok yavaş bir şekilde yere in.</li><li class='mb-2'>Karnını ve kalçanı inme süresince sımsıkı tut.</li><li>Yere tamamen ulaştığında dizlerini yere koyup rahatça başlangıç pozisyonuna dön.</li></ul>" },
  bulgarian_split_squat: { title: "Bulgarian Split Squat", target: "Ön Bacak, Kalça, Denge", search: "Bulgarian Split Squat correct form", guide: "<ul><li class='mb-2'>Arka ayağının üstünü sehpaya veya kutuya yerleştir.</li><li class='mb-2'>Gövdeni dik tut (ön bacağa odak) veya hafif öne eğ (kalçaya odak).</li><li class='mb-2'>İnişte ön dizin parmak ucunu geçebilir, ancak ön topuk asla yerden kalkmamalıdır.</li><li>3 saniyede kontrollü inip, dipte beklemeden güçlü şekilde kalk.</li></ul>" },
  assisted_pullup: { title: "Assisted Pull-Up / Band Pulldown", target: "Sırt / Kanat, Biceps", search: "Assisted Pull Up form technique", guide: "<ul><li class='mb-2'>Direnç bandını barfiks barına asıp dizini/ayağını geçir (veya makine kullan).</li><li class='mb-2'>Harekete başlarken omuzlarını aşağı bastır, göğsünü hafifçe bara doğru kaldır.</li><li class='mb-2'>Dirseklerini vücudunun yanından arka ceplerine doğru çeker gibi düşünerek in.</li><li>Tepede sırt kaslarını 1 saniye sıkıştır, kontrollü bırak.</li></ul>" },
  shoulder_press: { title: "Dumbbell Shoulder Press", target: "Omuzlar, Arka Kol", search: "Dumbbell Overhead Press form", guide: "<ul><li class='mb-2'>Ayakta veya dik oturarak ağırlıkları omuz hizanda tut.</li><li class='mb-2'>Harekete başlarken karın kaslarını sık ve nefes alarak belinin geriye kavislenmesini engelle.</li><li class='mb-2'>Ağırlıkları başının üstünde güçlü bir şekilde birleştir (çarpıştırmadan).</li><li>Kontrollü bir şekilde 2 saniyede kulak hizana kadar indir.</li></ul>" },
  scapular_pullup: { title: "Scapular Pull-Up & Asılma", target: "Omuz Bıçakları (Skapula), Tutuş", search: "Scapular Pull Up tutorial", guide: "<ul><li class='mb-2'>Barfiks barına asıl ve kollarını tamamen düz (kilitli) tut.</li><li class='mb-2'>Kollarını hiç bükmeden, sadece kürek kemiklerini aşağı ve geriye çekerek vücudunu birkaç santim yükselt. (Bu 5 tekrarlık bir mikro harekettir)</li><li>5 tekrarı tamamladıktan sonra omuzlarını serbest bırak ve 15 saniye boyunca kontrollü şekilde asılı kal.</li></ul>" },
  forearm_plank: { title: "Hardstyle Forearm Plank", target: "Tüm Core Bölgesi", search: "Hardstyle Plank vs Regular Plank", guide: "<ul><li class='mb-2'>Dirseklerin omuzlarının tam altında olacak şekilde ön kol plank pozisyonu al.</li><li class='mb-2'>Normal plankten farklı olarak: Dirseklerini ayaklarına, ayaklarını dirseklerine doğru (hayali olarak) çekerek yeri sıkıştır.</li><li>Kalçanı, karnını ve bacaklarını taş gibi kitle. 35 saniye boyunca tam efor ver.</li></ul>" }
};

const initialWorkouts = {
  A: [
    {
      id: "a1", altId: "a2", altName: "A2 Floor Press", key: "goblet_squat", name: "A1: Goblet Squat", targetSets: 4, setsReps: "4 × 8-10", intensity: "%75-80", tempo: "3 sn in, 1 sn dur, 1 sn kalk", rest: "75 sn", restSeconds: 75,
      note: "Dumbbell göğse yapışık, dirsekler dizlerin içine insin. A2 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false },
        { setNo: 3, kg: "", reps: "", rpe: "", done: false }, { setNo: 4, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "a2", altId: "a1", altName: "A1 Goblet Squat", key: "floor_press", name: "A2: Dumbbell Floor Press", targetSets: 4, setsReps: "4 × 10-12", intensity: "%70-75", tempo: "2 sn in, dirsek yerde 1 sn dur", rest: "75 sn", restSeconds: 75,
      note: "Yerde uygulanır. Dirsekler 45-60 derece açıyla inmeli. A1 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false },
        { setNo: 3, kg: "", reps: "", rpe: "", done: false }, { setNo: 4, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "b1", altId: "b2", altName: "B2 One-Arm Row", key: "dumbbell_rdl", name: "B1: Dumbbell RDL", targetSets: 3, setsReps: "3 × 8-10", intensity: "%75-80", tempo: "3 sn in, kalça geride 1 sn dur", rest: "75 sn", restSeconds: 75,
      note: "Kalçayı geriye it, hamstringleri hisset. B2 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "b2", altId: "b1", altName: "B1 Dumbbell RDL", key: "one_arm_row", name: "B2: One-Arm Dumbbell Row", targetSets: 3, setsReps: "3 × 8-10", intensity: "%75-80", tempo: "1 sn çek, 1 sn sık, 2 sn bırak", rest: "75 sn", restSeconds: 75,
      note: "Gövdeyi döndürmeden ağırlığı kalça cebine doğru çek. B1 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "c1", altId: "c2", altName: "C2 Dead Bug", key: "hip_thrust", name: "C1: Hip Thrust / Glute Bridge", targetSets: 3, setsReps: "3 × 10-12", intensity: "%75-80", tempo: "Tepede 2 sn kalçayı tam sık", rest: "60 sn", restSeconds: 60,
      note: "Bench veya yerde. Beli aşırı bükme. C2 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "c2", altId: "c1", altName: "C1 Hip Thrust", key: "dead_bug", name: "C2: Dead Bug (Ölü Böcek)", targetSets: 3, setsReps: "3 × 8 (her taraf)", intensity: "Vücut Ağırlığı", tempo: "2 sn uzan, 1 sn bekle", rest: "45-60 sn", restSeconds: 60,
      note: "Bel mat zeminine yapışık olmalı. C1 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "d1", altId: null, altName: null, key: "copenhagen_plank", name: "D: Copenhagen Plank", targetSets: 3, setsReps: "3 × 15-20 sn", intensity: "Sabit", tempo: "Sabit kilitlenip bekle", rest: "60 sn", restSeconds: 60,
      note: "Statik bekleme. Üst bacağın DİZİ sehpada, alt bacak havada.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    }
  ],
  B: [
    {
      id: "ba1", altId: "ba2", altName: "A2 Push-Up", key: "dumbbell_deadlift", name: "A1: Dumbbell Deadlift", targetSets: 4, setsReps: "4 × 6-8", intensity: "%80-85", tempo: "Yerden kalk, kontrollü in", rest: "90 sn", restSeconds: 90,
      note: "Dumbbell kaval kemiğine yakın. Yerden bacak ve kalçayla it. A2 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false },
        { setNo: 3, kg: "", reps: "", rpe: "", done: false }, { setNo: 4, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "ba2", altId: "ba1", altName: "A1 DB Deadlift", key: "pushup_eccentric", name: "A2: Push-Up (Yavaş Negatif)", targetSets: 4, setsReps: "4 × 3-5", intensity: "%80 Kontrol", tempo: "4-5 sn yavaşça in", rest: "75 sn", restSeconds: 75,
      note: "Tam şınavda parmak ucunda in, altta dizleri koyup kalk. A1 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false },
        { setNo: 3, kg: "", reps: "", rpe: "", done: false }, { setNo: 4, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "bb1", altId: "bb2", altName: "B2 Pull-Up", key: "bulgarian_split_squat", name: "B1: Bulgarian Split Squat", targetSets: 3, setsReps: "3 × 8", intensity: "Orta-Ağır", tempo: "3 sn in, beklemeden kalk", rest: "75 sn", restSeconds: 75,
      note: "Arka ayak yüksekte. Hyrox lunge temeli sağlar. B2 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "bb2", altId: "bb1", altName: "B1 Split Squat", key: "assisted_pullup", name: "B2: Assisted Pull-Up", targetSets: 3, setsReps: "3 × 8-10", intensity: "%75-80", tempo: "Aşağıda 1 sn sık", rest: "75 sn", restSeconds: 75,
      note: "Dirsekleri yan ceplere çeker gibi göğse çek. B1 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "bc1", altId: "bc2", altName: "C2 Scapular Pull-Up", key: "shoulder_press", name: "C1: Dumbbell Shoulder Press", targetSets: 3, setsReps: "3 × 8-10", intensity: "%70-75", tempo: "1 sn bas, 2 sn in", rest: "60 sn", restSeconds: 60,
      note: "Karın sıkı, beli geriye yaylandırmadan presle. C2 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "bc2", altId: "bc1", altName: "C1 Shoulder Press", key: "scapular_pullup", name: "C2: Scapular Pull-Up", targetSets: 3, setsReps: "3 × (5 tkr + 15 sn)", intensity: "Vücut Ağırlığı", tempo: "Kısa çekişler + asılma", rest: "60-75 sn", restSeconds: 60,
      note: "5 kürek kemiği çekişi yap, 15 sn asılı kal. C1 ile dönüşümlü.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    },
    {
      id: "bd1", altId: null, altName: null, key: "forearm_plank", name: "D: Forearm Plank", targetSets: 3, setsReps: "3 × 35-45 sn", intensity: "%80 Efor", tempo: "Karın kilitli bekle", rest: "60 sn", restSeconds: 60,
      note: "Dirsekleri ayaklara doğru çeker gibi tüm vücudu kitle.",
      setsData: [
        { setNo: 1, kg: "", reps: "", rpe: "", done: false }, { setNo: 2, kg: "", reps: "", rpe: "", done: false }, { setNo: 3, kg: "", reps: "", rpe: "", done: false }
      ]
    }
  ]
};

export default function WorkoutScreen() {
  const [activeTab, setActiveTab] = useState("A");
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [timer, setTimer] = useState({ active: false, time: 0, exerciseName: "" });
  const [workoutNotes, setWorkoutNotes] = useState("");
  // Supabase yükleme durumu için state
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timer.active && timer.time > 0) {
      interval = setInterval(() => {
        setTimer((prev) => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
    } else if (timer.time === 0 && timer.active) {
      setTimer((prev) => ({ ...prev, active: false }));
    }
    return () => clearInterval(interval);
  }, [timer.active, timer.time]);

  const updateSetField = (exerciseId, setIdx, field, val) => {
    setWorkouts(prev => {
      const currentList = prev[activeTab].map(ex => {
        if (ex.id === exerciseId) {
          const updatedSets = [...ex.setsData];
          updatedSets[setIdx] = { ...updatedSets[setIdx], [field]: val };
          return { ...ex, setsData: updatedSets };
        }
        return ex;
      });
      return { ...prev, [activeTab]: currentList };
    });
  };

  const toggleSetDone = (exercise, setIdx) => {
    const isCurrentlyDone = exercise.setsData[setIdx].done;
    const nextState = !isCurrentlyDone;
    updateSetField(exercise.id, setIdx, "done", nextState);
    if (nextState) {
      setTimer({ active: true, time: exercise.restSeconds, exerciseName: `${exercise.name} (Set ${setIdx + 1})` });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isWorkoutComplete = () => {
    if (activeTab === "INFO") return false;
    return workouts[activeTab].every(ex => ex.setsData.every(set => set.done));
  };

  const scrollToExercise = (targetId) => {
    const element = document.getElementById(`ex-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-[#4472c4]', 'ring-opacity-50');
      setTimeout(() => element.classList.remove('ring-4', 'ring-[#4472c4]', 'ring-opacity-50'), 1000);
    }
  };

  // SUPABASE KAYIT FONKSİYONU
  const saveWorkoutToDatabase = async () => {
    setIsSaving(true);
    
    const cleanWorkoutData = workouts[activeTab].map(ex => {
      return {
        hareket: ex.name,
        setler: ex.setsData.map(s => ({
          set_no: s.setNo,
          kg: s.kg || "-",
          tekrar: s.reps || "-",
          zorluk: s.rpe || "-"
        }))
      }
    });

    try {
      const { data, error } = await supabase
        .from('completed_workouts')
        .insert([
          { 
            student_name: 'Halime Yasak', 
            workout_day: activeTab === "A" ? "Gün A" : "Gün B",
            workout_data: cleanWorkoutData,
            coach_note: workoutNotes 
          }
        ]);

      if (error) throw error;
      
      alert("Harika! Antrenman başarıyla antrenörünün sistemine kaydedildi 💪");
    } catch (error) {
      alert("Kaydedilirken bir hata oluştu: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1f6] text-gray-900 font-sans pb-32 relative scroll-smooth">
      <header className="bg-gradient-to-br from-[#203864] to-[#2f5296] text-white p-5 rounded-b-3xl shadow-md text-center">
        <h1 className="text-xl font-bold tracking-wide">KUVVET & HİPERTROFİ</h1>
        <p className="text-xs opacity-90 mt-1">Hyrox Entegrasyonlu Performans Takibi</p>
        
        <div className="flex justify-center gap-2 mt-4 bg-white/10 p-1 rounded-full overflow-hidden">
          <button onClick={() => setActiveTab("INFO")} className={`flex-1 py-2 px-3 rounded-full font-bold text-[0.7rem] transition-all whitespace-nowrap ${activeTab === "INFO" ? 'bg-white text-[#203864] shadow-md' : 'text-white hover:bg-white/20'}`}>
            📚 Program
          </button>
          <button onClick={() => setActiveTab("A")} className={`flex-1 py-2 px-3 rounded-full font-bold text-[0.7rem] transition-all whitespace-nowrap ${activeTab === "A" ? 'bg-white text-[#203864] shadow-md' : 'text-white hover:bg-white/20'}`}>
            Gün A (Salı)
          </button>
          <button onClick={() => setActiveTab("B")} className={`flex-1 py-2 px-3 rounded-full font-bold text-[0.7rem] transition-all whitespace-nowrap ${activeTab === "B" ? 'bg-white text-[#203864] shadow-md' : 'text-white hover:bg-white/20'}`}>
            Gün B (Cuma)
          </button>
        </div>
      </header>

      <main className="p-4 mt-2 space-y-5 max-w-md mx-auto">
        
        {activeTab === "INFO" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dfe5ee]">
              <h2 className="font-bold text-[#203864] border-b pb-2 mb-3">1. Sporcu & Program Bilgileri</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="block text-xs font-bold text-[#4472c4]">Sporcu</span><span className="font-semibold text-gray-800">Halime Yasak (Kadın, 33, 71kg)</span></div>
                <div><span className="block text-xs font-bold text-[#4472c4]">Seviye</span><span className="font-semibold text-gray-800">Orta Seviye</span></div>
                <div><span className="block text-xs font-bold text-[#4472c4]">Ek Antrenman</span><span className="font-semibold text-gray-800">Haftada 2-3 gün Hyrox</span></div>
                <div><span className="block text-xs font-bold text-[#4472c4]">Sıklık</span><span className="font-semibold text-gray-800">Haftada 2 Gün (Kuvvet)</span></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dfe5ee]">
              <h2 className="font-bold text-[#203864] border-b pb-2 mb-3">2. Haftalık Düzen</h2>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className="flex items-center gap-2"><span className="font-bold text-gray-600 w-16">Pzt:</span> Dinlenme / Mobilite</li>
                <li className="flex items-center gap-2 bg-[#f3f6fa] p-2 rounded-lg border-l-4 border-[#203864]"><span className="font-bold text-[#203864] w-16">Salı:</span> <span><b>Gün A:</b> Diz Dominant + İtiş</span></li>
                <li className="flex items-center gap-2"><span className="font-bold text-gray-600 w-16">Çar:</span> Hyrox Grup Dersi</li>
                <li className="flex items-center gap-2"><span className="font-bold text-gray-600 w-16">Per:</span> Aktif Toparlanma</li>
                <li className="flex items-center gap-2 bg-[#f3f6fa] p-2 rounded-lg border-l-4 border-[#203864]"><span className="font-bold text-[#203864] w-16">Cuma:</span> <span><b>Gün B:</b> Kalça Dominant + Çekiş</span></li>
                <li className="flex items-center gap-2"><span className="font-bold text-gray-600 w-16">Cts:</span> Hyrox Grup Dersi</li>
                <li className="flex items-center gap-2"><span className="font-bold text-gray-600 w-16">Paz:</span> Tam Dinlenme</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl shadow-sm border border-blue-200">
              <h2 className="font-bold text-[#203864] border-b border-blue-200 pb-2 mb-3">3. Tabloları Nasıl Okuyacaksın?</h2>
              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <b className="text-[#4472c4] block mb-1">🔄 Dönüşümlü Set (A1 / A2) Nedir?</b>
                  <p>Birbirini engellemeyen iki hareket sırayla yapılır. Örneğin; A1'in ilk setini yap, dinlen, ardından A2'nin ilk setini yap ve dinlen. Setler bitene kadar iki hareket arasında git-gel yap. Bu sana güç kaybı olmadan zaman kazandırır.</p>
                </div>
                <div>
                  <b className="text-[#4472c4] block mb-1">💪 Yüklenme Şiddeti (%)</b>
                  <p>%70-75 rahat bir ağırlık, %75-80 zorlayıcı (gelişim bölgesi), %80-85 ise limite yakın ağır bir ağırlıktır.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#fdf2f2] p-5 rounded-2xl shadow-sm border border-[#f0c9c9]">
              <h2 className="font-bold text-red-600 border-b border-red-200 pb-2 mb-3">4. Beslenme Stratejisi</h2>
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-xl border border-[#f0c9c9]">
                  <h3 className="font-bold text-red-600 text-sm mb-1">1. NET 115-130 GR PROTEİN</h3>
                  <p className="text-xs text-gray-800">Her ana öğünde bir protein kaynağı bulundur.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#f0c9c9]">
                  <h3 className="font-bold text-red-600 text-sm mb-1">2. KARBONHİDRAT ZAMANLAMASI</h3>
                  <p className="text-xs text-gray-800">Antrenmandan 1.5-2 saat önce ve sonra tüket.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "A" || activeTab === "B") && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center font-bold text-[#203864] text-[0.8rem] tracking-wide mb-4 bg-white py-2 rounded-lg shadow-sm border border-[#dfe5ee]">
              {activeTab === "A" ? "GÜN A: TÜM VÜCUT (DİZ DOMİNANT + İTİŞ/ÇEKİŞ)" : "GÜN B: TÜM VÜCUT (DEADLIFT + TEK BACAK)"}
            </div>

            {workouts[activeTab].map((ex) => (
              <div id={`ex-${ex.id}`} key={ex.id} className="p-5 rounded-2xl shadow-sm border bg-white border-[#dfe5ee] mb-5 transition-shadow duration-500">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-[0.95rem] text-[#203864] leading-tight pr-2">{ex.name}</h2>
                  <button onClick={() => setSelectedExercise(exerciseData[ex.key])} className="bg-[#e8f0fe] text-[#4472c4] border border-[#cce0ff] text-[0.7rem] font-bold px-3 py-1.5 rounded-full active:bg-[#4472c4] active:text-white transition-all hover:bg-[#d6e5ff] whitespace-nowrap">
                    📖 Form
                  </button>
                </div>

                {ex.altId && (
                  <div className="flex justify-between items-center bg-[#f0f4ff] border border-[#dce6ff] p-2.5 rounded-xl mb-3 shadow-inner">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔄</span>
                      <div>
                        <span className="block text-[0.6rem] font-bold text-[#4472c4] uppercase tracking-wider">Dönüşümlü Set</span>
                        <span className="block text-xs font-semibold text-[#203864]">Sıradaki: {ex.altName}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => scrollToExercise(ex.altId)}
                      className="text-xs font-bold text-white bg-[#4472c4] hover:bg-[#203864] px-4 py-2 rounded-lg shadow-md active:scale-95 transition-all"
                    >
                      Geç ⬇
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-[#f3f6fa] p-2 rounded-lg text-center flex flex-col justify-center">
                    <span className="block text-[0.6rem] uppercase tracking-wide text-[#203864] opacity-80 font-bold mb-1">Set × Tekrar</span>
                    <span className="block text-xs font-bold text-[#4472c4] leading-tight">{ex.setsReps} <br/> <span className="text-gray-500 font-normal">{ex.intensity}</span></span>
                  </div>
                  <div className="bg-[#f3f6fa] p-2 rounded-lg text-center flex flex-col justify-center">
                    <span className="block text-[0.6rem] uppercase tracking-wide text-[#203864] opacity-80 font-bold mb-1">Tempo</span>
                    <span className="block text-[0.7rem] font-bold text-[#4472c4] leading-tight">{ex.tempo}</span>
                  </div>
                  <div className="bg-[#f3f6fa] p-2 rounded-lg text-center flex flex-col justify-center">
                    <span className="block text-[0.6rem] uppercase tracking-wide text-[#203864] opacity-80 font-bold mb-1">Dinlenme</span>
                    <span className="block text-xs font-bold text-[#4472c4] leading-tight">{ex.rest}</span>
                  </div>
                </div>

                <div className="mb-4 text-[0.75rem] text-gray-700 bg-gray-50 border-l-4 border-[#4472c4] p-2 rounded-r-lg font-medium">
                  Not: {ex.note}
                </div>

                <div className="space-y-2 mt-2">
                  <div className="grid grid-cols-12 gap-1 text-[0.65rem] font-bold text-gray-500 px-1 text-center items-end pb-1 border-b">
                    <div className="col-span-2">SET</div>
                    <div className="col-span-3">KG</div>
                    <div className="col-span-2">TKR</div>
                    <div className="col-span-2 text-[0.6rem] leading-none">ZORLUK<br/>(1-10)</div>
                    <div className="col-span-3">DURUM</div>
                  </div>

                  {ex.setsData.map((s, idx) => (
                    <div key={idx} className={`grid grid-cols-12 gap-1 items-center p-1.5 rounded-xl border transition-all ${s.done ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="col-span-2 text-center font-bold text-xs text-[#203864]">#{s.setNo}</div>
                      <div className="col-span-3">
                        <input type="number" placeholder="0" value={s.kg} onChange={(e) => updateSetField(ex.id, idx, "kg", e.target.value)} disabled={s.done} className="w-full p-1.5 text-center text-sm font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] bg-white disabled:bg-transparent disabled:border-none" />
                      </div>
                      <div className="col-span-2">
                        <input type="number" placeholder="0" value={s.reps} onChange={(e) => updateSetField(ex.id, idx, "reps", e.target.value)} disabled={s.done} className="w-full p-1.5 text-center text-sm font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] bg-white disabled:bg-transparent disabled:border-none" />
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="1" max="10" placeholder="-" value={s.rpe} onChange={(e) => updateSetField(ex.id, idx, "rpe", e.target.value)} disabled={s.done} className="w-full p-1.5 text-center text-sm font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 bg-white disabled:bg-transparent disabled:border-none text-red-600" />
                      </div>
                      <div className="col-span-3">
                        <button onClick={() => toggleSetDone(ex, idx)} className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${s.done ? 'bg-green-600 text-white shadow-inner' : 'bg-[#4472c4] text-white hover:bg-[#203864] shadow-md'}`}>
                          {s.done ? "✓" : "Bitir"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="p-5 rounded-2xl shadow-sm border bg-white border-[#dfe5ee] mt-8 mb-6">
              <h2 className="font-bold text-[1rem] text-[#203864] mb-2">📋 Antrenörüne Not Bırak</h2>
              <p className="text-xs text-gray-500 mb-3">Bugünkü hissiyatın nasıldı? Herhangi bir ağrı, zorlanma veya eklemek istediğin bir şey var mı?</p>
              <textarea rows="3" placeholder="Örn: A2 hareketinde sol omzumda hafif bir baskı hissettim..." value={workoutNotes} onChange={(e) => setWorkoutNotes(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#4472c4] resize-none bg-gray-50"></textarea>
              
              <button 
                onClick={saveWorkoutToDatabase}
                className={`w-full mt-4 py-4 rounded-xl font-bold text-white transition-all shadow-lg text-lg flex justify-center items-center gap-2
                ${!isWorkoutComplete() ? 'bg-gray-400 cursor-not-allowed' : isSaving ? 'bg-[#203864] opacity-80 cursor-wait' : 'bg-green-600 hover:bg-green-700 animate-pulse'}`} 
                disabled={!isWorkoutComplete() || isSaving}
              >
                {!isWorkoutComplete() ? "Tüm Setleri Bitirmeniz Bekleniyor..." : isSaving ? "Kaydediliyor..." : "🚀 ANTRENMANI KAYDET VE BİTİR"}
              </button>
            </div>
          </div>
        )}
      </main>

      {timer.active && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#203864] text-white p-4 shadow-[0_-4px_15px_rgba(0,0,0,0.2)] flex justify-between items-center animate-in slide-in-from-bottom-5 duration-300 z-50">
          <div>
            <p className="text-[0.65rem] opacity-80 font-bold mb-0.5 uppercase tracking-wider">Dinlenme Süresi</p>
            <p className="text-xs font-bold truncate max-w-[200px]">{timer.exerciseName}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-mono font-bold tracking-tighter text-[#60a5fa]">{formatTime(timer.time)}</span>
            <button onClick={() => setTimer({ active: false, time: 0, exerciseName: "" })} className="bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors text-sm">✕</button>
          </div>
        </div>
      )}

      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[60] backdrop-blur-sm" onClick={() => setSelectedExercise(null)}>
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="bg-[#203864] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-base pr-2">{selectedExercise.title}</h3>
              <button onClick={() => setSelectedExercise(null)} className="text-2xl leading-none opacity-80 hover:opacity-100">&times;</button>
            </div>
            <div className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
              <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedExercise.search)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors text-sm shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                YouTube'da Videosunu İzle
              </a>
              <div className="text-center">
                <span className="inline-block bg-[#203864] text-white text-xs font-bold px-3 py-1.5 rounded-full">Odak: {selectedExercise.target}</span>
              </div>
              <div className="bg-[#f3f6fa] p-4 rounded-xl border-l-4 border-[#4472c4] text-xs text-gray-700 leading-relaxed list-inside" dangerouslySetInnerHTML={{ __html: selectedExercise.guide }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
