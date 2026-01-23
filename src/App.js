import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  ComposedChart,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  Play,
  MousePointer2,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  PlusCircle,
  ArrowLeft,
  Save,
  Calendar,
  Upload,
  FileText,
  X,
  FileSpreadsheet,
  Trash2,
  ArrowUpDown,
  ThumbsUp,
  Share2,
  MessageCircle,
  UserPlus,
  Eye,
  UserCircle,
  List,
  Grid3X3,
  Database,
  RefreshCw,
  Activity,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Timer,
  Zap,
  BarChart2,
  Edit3,
  ChevronDown,
  ChevronUp,
  LogOut,
  LogIn,
  Mail,
  Phone,
  CheckSquare,
  Square,
} from "lucide-react";

// Firebase Imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  addDoc,
  updateDoc,
  writeBatch,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

// --- STYLES (Inline CSS for standalone environment) ---
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: "#f8fafc",
    color: "#0f172a",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    position: "sticky",
    top: 0,
    height: "100vh",
    zIndex: 10,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
    color: "#ef4444",
    fontWeight: "800",
    fontSize: "20px",
    fontStyle: "italic",
    textTransform: "uppercase",
  },
  navItem: (active) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "4px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    backgroundColor: active ? "#fef2f2" : "transparent",
    color: active ? "#ef4444" : "#64748b",
    transition: "all 0.2s ease",
  }),
  main: {
    flex: 1,
    padding: "32px",
    overflowY: "auto",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginTop: "4px",
    fontWeight: "500",
  },
  // 로그인 관련 스타일
  loginContainer: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    padding: "20px",
  },
  loginCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "24px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#0f172a",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "12px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  iconBox: (color) => ({
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: color,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  statLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingTop: "16px",
    borderTop: "1px dashed #e2e8f0",
  },
  firstSectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  chartContainer: {
    height: "300px",
    width: "100%",
  },
  listHeader: {
    display: "grid",
    gridTemplateColumns: "4fr 1.5fr 1.5fr 1.5fr 0.5fr",
    gap: "16px",
    padding: "12px 24px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  listItem: {
    display: "grid",
    gridTemplateColumns: "4fr 1.5fr 1.5fr 1.5fr 0.5fr",
    gap: "16px",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    marginBottom: "12px",
    transition: "all 0.2s",
    cursor: "pointer",
    position: "relative",
  },
  textTruncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    minWidth: 0,
  },
  uploadBox: {
    border: "2px dashed #e2e8f0",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  buttonPrimary: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },
  sortButton: (active) => ({
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    backgroundColor: active ? "#fef2f2" : "transparent",
    color: active ? "#ef4444" : "#64748b",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  trendBadge: (isUp) => ({
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "6px",
    backgroundColor: isUp ? "#dcfce7" : "#fee2e2",
    color: isUp ? "#15803d" : "#b91c1c",
    marginTop: "8px",
    width: "fit-content",
  }),
  selectInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    marginBottom: "12px", // 여백 조정
    backgroundColor: "#fff",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },
  thSticky: {
    position: "sticky",
    left: 0,
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "13px",
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    borderRight: "2px solid #e2e8f0",
    zIndex: 2,
    textAlign: "left",
    minWidth: "140px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
  },
  th: {
    backgroundColor: "#f8fafc",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "700",
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
    borderRight: "1px solid #e2e8f0",
    textAlign: "center",
    minWidth: "70px",
    whiteSpace: "nowrap",
  },
  tdSticky: {
    position: "sticky",
    left: 0,
    backgroundColor: "#fff",
    fontWeight: "600",
    fontSize: "13px",
    color: "#334155",
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    borderRight: "2px solid #e2e8f0",
    zIndex: 1,
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
  },
  td: {
    padding: "10px",
    fontSize: "13px",
    borderBottom: "1px solid #e2e8f0",
    borderRight: "1px solid #f1f5f9",
    textAlign: "center",
    color: "#475569",
    position: "relative",
  },
  anomalyBadge: {
    position: "absolute",
    top: "-5px",
    right: "50%",
    transform: "translateX(50%)",
    backgroundColor: "#f59e0b",
    color: "#fff",
    fontSize: "9px",
    padding: "1px 4px",
    borderRadius: "4px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    zIndex: 10,
  },
  inputField: {
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    width: "60px",
    textAlign: "right",
    fontSize: "12px",
  },
  toggleButton: (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    border: `1px solid ${isActive ? "transparent" : "#e2e8f0"}`,
    backgroundColor: isActive ? "#f0f9ff" : "#ffffff",
    color: isActive ? "#0369a1" : "#64748b",
    transition: "all 0.2s",
  }),
};

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC56WeU2cDYmTS_jskbjI4vPZZOp8-pEYk",
  authDomain: "ytytyt-48c48.firebaseapp.com",
  projectId: "ytytyt-48c48",
  storageBucket: "ytytyt-48c48.firebasestorage.app",
  messagingSenderId: "332671988128",
  appId: "1:332671988128:web:bbce495621f9b6ddfe74c5",
  measurementId: "G-YGG902CS67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId =
  typeof __app_id !== "undefined" ? __app_id : "youtube-strategist-app";

const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 관리
  const [loginMethod, setLoginMethod] = useState("main"); // 'main', 'email', 'phone'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  // Golden Time State
  const [goldenVideoId, setGoldenVideoId] = useState("");
  const [goldenData, setGoldenData] = useState([]);
  const [isManualGoldenData, setIsManualGoldenData] = useState(false);
  const [uploadTime, setUploadTime] = useState("");

  // Golden Data Entry State
  const [entryVideoId, setEntryVideoId] = useState("");
  const [entryData, setEntryData] = useState(
    Array.from({ length: 48 }, (_, i) => ({
      hour: i + 1,
      views: 0,
      impressions: 0,
    }))
  );
  const [showAllHours, setShowAllHours] = useState(false);

  // Sorting State
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Import State
  const [importData, setImportData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [parsingError, setParsingError] = useState(null);
  const [referenceDate, setReferenceDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // 데이터 기준일 추가

  // Trend Metric Selection
  const [trendMetrics, setTrendMetrics] = useState({
    views: true,
    impressions: false,
    ctr: false,
    retention: false,
  });

  // Load SheetJS
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- 로그인 핸들러 ---
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      alert("로그인 실패: " + error.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입 성공! 자동 로그인됩니다.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("이미 사용 중인 이메일입니다.");
      else if (error.code === "auth/invalid-credential")
        alert("이메일이나 비밀번호가 틀렸습니다.");
      else if (error.code === "auth/weak-password")
        alert("비밀번호는 6자리 이상이어야 합니다.");
      else alert("오류: " + error.message);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
        }
      );
    }
  };

  const requestOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert("전화번호를 입력해주세요.");

    let formattedNumber = phoneNumber;
    if (phoneNumber.startsWith("010")) {
      formattedNumber = "+82" + phoneNumber.slice(1);
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setVerificationId(confirmationResult);
      alert("인증번호가 발송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("문자 발송 실패. (형식: 01012345678) " + error.message);
      if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!verificationId) return;
    try {
      await verificationId.confirm(otp);
    } catch (error) {
      alert("인증번호가 틀렸습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setVideos([]);
      setSelectedVideo(null);
      setLoginMethod("main");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Data Sync
  useEffect(() => {
    if (!user) {
      setVideos([]);
      return;
    }
    const videoRef = collection(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "videos"
    );
    const unsubVideos = onSnapshot(
      videoRef,
      (snapshot) => {
        const videoList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videoList);
      },
      (error) => console.error("Snapshot error:", error)
    );
    return () => unsubVideos();
  }, [user]);

  // Golden Data Logic
  useEffect(() => {
    const fetchGoldenData = async () => {
      if (activeTab === "golden_time" && goldenVideoId && user) {
        const docRef = doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "goldenTimeData",
          goldenVideoId
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const rawData = docSnap.data().hourlyData || [];
          const processedData = processGoldenData(rawData);
          setGoldenData(processedData);
          setIsManualGoldenData(true);
        } else {
          const video = videos.find((v) => v.id === goldenVideoId);
          if (!video) return;
          const mockData = generateMockGoldenData(video);
          setGoldenData(mockData);
          setIsManualGoldenData(false);
        }
      }
    };
    fetchGoldenData();
  }, [goldenVideoId, activeTab, videos, user]);

  const generateMockGoldenData = (video) => {
    const mockData = [];
    const totalViews = video.views || 1000;
    const totalImpressions = video.impressions || totalViews * 15;

    let currentCumViews = 0;
    let currentCumImps = 0;

    for (let i = 1; i <= 48; i++) {
      let growthFactor = Math.log(i + 1) / Math.log(49);

      let anomalyMult = 1.0;
      if (i === 10) anomalyMult = 0.3;
      if (i === 12) anomalyMult = 3.0;

      const randomVar = (0.9 + Math.random() * 0.2) * anomalyMult;

      let viewsAtHour = Math.floor(totalViews * growthFactor * randomVar);
      let impsAtHour = Math.floor(totalImpressions * growthFactor * randomVar);

      if (viewsAtHour < currentCumViews) viewsAtHour = currentCumViews;
      if (impsAtHour < currentCumImps) impsAtHour = currentCumImps;

      if (impsAtHour > 0 && viewsAtHour / impsAtHour > 0.3) {
        impsAtHour = Math.floor(viewsAtHour / 0.15);
      }

      mockData.push({
        hour: i,
        views: viewsAtHour,
        impressions: impsAtHour,
      });

      currentCumViews = viewsAtHour;
      currentCumImps = impsAtHour;
    }
    return processGoldenData(mockData);
  };

  const processGoldenData = (rawData) => {
    const hourlyData = [];
    let prevCumViews = 0;
    let prevCumImps = 0;

    rawData.forEach((row) => {
      const hourlyViews = row.views - prevCumViews;
      const hourlyImps = row.impressions - prevCumImps;

      hourlyData.push({
        ...row,
        hourlyViews: Math.max(0, hourlyViews),
        hourlyImps: Math.max(0, hourlyImps),
        cumViews: row.views,
        cumImps: row.impressions,
      });

      prevCumViews = row.views;
      prevCumImps = row.impressions;
    });

    return hourlyData.map((row, idx, arr) => {
      let impressionGrowthRate = 0;
      let isAnomaly = false;

      if (idx > 0) {
        const prevHourlyImps = arr[idx - 1].hourlyImps;
        if (prevHourlyImps > 0) {
          impressionGrowthRate =
            ((row.hourlyImps - prevHourlyImps) / prevHourlyImps) * 100;
        }
        if (row.hourlyImps > prevHourlyImps * 1.3 && row.hourlyImps > 50) {
          isAnomaly = true;
        }
      }

      const hourlyCtr =
        row.hourlyImps > 0
          ? ((row.hourlyViews / row.hourlyImps) * 100).toFixed(1)
          : 0;

      return {
        rawHour: row.hour,
        hour: `${row.hour}H`,
        hourlyImps: row.hourlyImps,
        cumImps: row.impressions,
        growthRate: impressionGrowthRate.toFixed(1),
        ctr: hourlyCtr,
        cumViews: row.cumViews,
        hourlyViews: row.hourlyViews,
        isAnomaly: isAnomaly,
      };
    });
  };

  const getDisplayTime = (hourOffset) => {
    if (!uploadTime) return `${hourOffset}H`;
    try {
      const baseDate = new Date(uploadTime);
      baseDate.setHours(baseDate.getHours() + hourOffset);
      const month = baseDate.getMonth() + 1;
      const day = baseDate.getDate();
      const hour = baseDate.getHours().toString().padStart(2, "0");
      return `${month}/${day} ${hour}:00`;
    } catch (e) {
      return `${hourOffset}H`;
    }
  };

  const chartDataWithTime = goldenData.map((d) => ({
    ...d,
    displayTime: getDisplayTime(d.rawHour),
  }));

  useEffect(() => {
    const loadEntryData = async () => {
      if (activeTab === "golden_entry" && entryVideoId && user) {
        const docRef = doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "goldenTimeData",
          entryVideoId
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const savedData = docSnap.data().hourlyData;
          const merged = Array.from({ length: 48 }, (_, i) => {
            const found = savedData.find((d) => d.hour === i + 1);
            return found || { hour: i + 1, views: 0, impressions: 0 };
          });
          setEntryData(merged);
        } else {
          setEntryData(
            Array.from({ length: 48 }, (_, i) => ({
              hour: i + 1,
              views: 0,
              impressions: 0,
            }))
          );
        }
      }
    };
    loadEntryData();
  }, [entryVideoId, activeTab, user]);

  const handleEntryChange = (index, field, value) => {
    const newData = [...entryData];
    newData[index][field] = parseInt(value) || 0;
    setEntryData(newData);
  };

  const saveEntryData = async () => {
    if (!entryVideoId) return alert("영상을 선택해주세요.");
    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "goldenTimeData",
          entryVideoId
        ),
        {
          videoId: entryVideoId,
          hourlyData: entryData,
          updatedAt: new Date().getTime(),
        }
      );
      alert("골든타임 데이터가 저장되었습니다.");
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    }
  };

  const sanitizeId = (str) =>
    !str
      ? "unknown_id"
      : str.replace(/[\/\.\#\$\?\[\]]/g, "_").replace(/\s+/g, "");
  const safeParseDate = (dateInput) => {
    try {
      if (typeof dateInput === "number")
        return new Date(Math.round((dateInput - 25569) * 86400 * 1000))
          .toISOString()
          .split("T")[0];
      if (dateInput) {
        const d = new Date(dateInput);
        if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
      }
    } catch (e) {}
    return new Date().toISOString().split("T")[0];
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setParsingError(null);
    const reader = new FileReader();

    const processSheet = (data) => {
      try {
        if (!data || data.length < 2)
          throw new Error("데이터가 너무 적습니다.");

        const targetHeaders = {
          id: ["콘텐츠", "Content", "Video ID", "id"],
          title: ["동영상 제목", "Video title", "제목"],
          views: ["조회수", "Views"],
          ctr: ["노출 클릭률 (%)", "Impressions click-through rate (%)"],
          date: ["동영상 게시 시간", "Video publish time", "게시일", "날짜"],
          retention: ["평균 조회율 (%)", "Average percentage viewed (%)"],
          impressions: ["노출수", "Impressions"],
          likes: ["좋아요", "Likes"],
          shares: ["공유", "Shares"],
          comments: ["추가된 댓글 수", "Comments added"],
          subs: ["구독자 증가수", "Subscribers gained"],
        };

        let headerRowIndex = -1;
        let headers = [];
        for (let i = 0; i < Math.min(data.length, 20); i++) {
          const row = data[i];
          if (
            Array.isArray(row) &&
            row.some((cell) =>
              targetHeaders.title.includes(String(cell).trim())
            )
          ) {
            headerRowIndex = i;
            headers = row;
            break;
          }
        }
        if (headerRowIndex === -1) throw new Error("헤더를 찾을 수 없습니다.");

        const findCol = (keys) =>
          headers.findIndex((h) => keys.includes(String(h).trim()));
        const colMap = {
          id: findCol(targetHeaders.id),
          title: findCol(targetHeaders.title),
          views: findCol(targetHeaders.views),
          ctr: findCol(targetHeaders.ctr),
          date: findCol(targetHeaders.date),
          retention: findCol(targetHeaders.retention),
          impressions: findCol(targetHeaders.impressions),
          likes: findCol(targetHeaders.likes),
          shares: findCol(targetHeaders.shares),
          comments: findCol(targetHeaders.comments),
          subs: findCol(targetHeaders.subs),
        };

        const results = [];
        for (let i = headerRowIndex + 1; i < data.length; i++) {
          const row = data[i];
          if (!row || row.length === 0) continue;
          if (!row[colMap.title] && !row[colMap.id]) continue;
          if (
            String(row[0]).includes("합계") ||
            String(row[0]).includes("Total")
          )
            continue;

          const title = row[colMap.title]
            ? String(row[colMap.title])
            : "제목 없음";
          const dateStr = safeParseDate(row[colMap.date]); // 게시일
          let contentId = row[colMap.id];
          if (!contentId) contentId = sanitizeId(title) + "_" + dateStr;
          else contentId = sanitizeId(String(contentId));

          results.push({
            id: contentId,
            title: title,
            views: parseInt(row[colMap.views]) || 0,
            ctr: parseFloat(row[colMap.ctr]) || 0,
            retention: parseFloat(row[colMap.retention]) || 0,
            impressions: parseInt(row[colMap.impressions]) || 0,
            likes: parseInt(row[colMap.likes]) || 0,
            shares: parseInt(row[colMap.shares]) || 0,
            comments: parseInt(row[colMap.comments]) || 0,
            subs: parseInt(row[colMap.subs]) || 0,
            date: dateStr, // 게시일
          });
        }
        if (results.length === 0) throw new Error("추출된 데이터가 없습니다.");
        setImportData(results);
      } catch (err) {
        setParsingError(err.message);
      }
    };

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      reader.onload = (e) => {
        if (!window.XLSX) return;
        const data = new Uint8Array(e.target.result);
        const workbook = window.XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        processSheet(window.XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = (e) => {
        if (!window.XLSX) return;
        const workbook = window.XLSX.read(e.target.result, { type: "string" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        processSheet(window.XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
      };
      reader.readAsText(file);
    }
  };

  const saveBatchData = async () => {
    if (!user || importData.length === 0) return;
    setIsUploading(true);
    try {
      const batch = writeBatch(db);
      const videoColl = collection(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "videos"
      );

      // 기존 데이터를 읽어와서 히스토리를 병합해야 함
      // 주의: 대량 업로드 시 읽기 비용이 발생하지만, 데이터 무결성을 위해 필요
      // 일괄 처리를 위해 비동기 루프 사용

      for (const item of importData) {
        if (!item.id || item.id.trim() === "") continue;

        const docRef = doc(videoColl, item.id);
        const docSnap = await getDoc(docRef);

        let dailyHistory = [];
        let createdDate = item.date;

        if (docSnap.exists()) {
          const existingData = docSnap.data();
          dailyHistory = existingData.dailyHistory || [];
          createdDate = existingData.date || item.date; // 기존 게시일 유지
        }

        // 현재 기준일(referenceDate) 데이터 생성
        const todayStats = {
          date: referenceDate, // 사용자 지정 기준일 (YYYY-MM-DD)
          views: item.views,
          impressions: item.impressions,
          ctr: item.ctr,
          retention: item.retention,
          likes: item.likes,
          shares: item.shares,
          comments: item.comments,
          subs: item.subs,
        };

        // 동일 날짜 데이터가 있으면 제거 (업데이트)
        dailyHistory = dailyHistory.filter((h) => h.date !== referenceDate);
        // 새 데이터 추가 및 날짜순 정렬
        dailyHistory.push(todayStats);
        dailyHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

        batch.set(
          docRef,
          {
            ...item,
            date: createdDate, // 게시일은 최초 값 유지 or 엑셀 값
            dailyHistory: dailyHistory,
            updatedAt: new Date().getTime(),
          },
          { merge: true }
        );
      }

      await batch.commit();
      setImportData([]);
      setFileName("");
      setActiveTab("library");
      alert(
        `데이터 저장 및 히스토리 업데이트 완료! (기준일: ${referenceDate})`
      );
    } catch (err) {
      console.error(err);
      alert("저장 실패: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteVideo = async (e, videoId) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "videos", videoId)
      );
    } catch (err) {
      alert("삭제 실패: " + err.message);
    }
  };

  // Sorting
  const sortedVideos = [...videos].sort((a, b) => {
    let valA = a[sortBy],
      valB = b[sortBy];
    if (sortBy === "date") {
      valA = new Date(a.date).getTime();
      valB = new Date(b.date).getTime();
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Metrics Calculation
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const recentVideos = sortedVideos.filter(
    (v) => new Date(v.date) >= twoWeeksAgo
  );

  // All Time Stats
  const totalStats = videos.reduce(
    (acc, curr) => ({
      views: acc.views + (curr.views || 0),
      impressions: acc.impressions + (curr.impressions || 0),
      ctr: acc.ctr + (curr.ctr || 0),
      retention: acc.retention + (curr.retention || 0),
    }),
    { views: 0, impressions: 0, ctr: 0, retention: 0 }
  );
  const avgCtr = videos.length
    ? (totalStats.ctr / videos.length).toFixed(2)
    : 0;
  const avgRetention = videos.length
    ? (totalStats.retention / videos.length).toFixed(1)
    : 0;

  // Recent Stats (For Comparison)
  const recentStatsSum = recentVideos.reduce(
    (acc, curr) => ({
      views: acc.views + (curr.views || 0),
      impressions: acc.impressions + (curr.impressions || 0),
      ctr: acc.ctr + (curr.ctr || 0),
      retention: acc.retention + (curr.retention || 0),
    }),
    { views: 0, impressions: 0, ctr: 0, retention: 0 }
  );

  const recentCount = recentVideos.length || 1;
  const avgRecentViews = (recentStatsSum.views / recentCount).toFixed(0);
  const avgRecentImpressions = (
    recentStatsSum.impressions / recentCount
  ).toFixed(0);
  const avgRecentCtr = (recentStatsSum.ctr / recentCount).toFixed(2);
  const avgRecentRetention = (recentStatsSum.retention / recentCount).toFixed(
    1
  );

  // Helper to Calculate Trend
  const getTrend = (current, average) => {
    const avgVal = parseFloat(average);
    const currVal = parseFloat(current);
    if (!avgVal) return { label: "-", isUp: true };
    const diff = currVal - avgVal;
    const isUp = diff >= 0;
    const percent = ((Math.abs(diff) / avgVal) * 100).toFixed(1);
    return {
      label: `${isUp ? "+" : "-"}${percent}%`,
      isUp,
      diff: diff,
    };
  };

  // Render Helpers
  const StatCard = ({
    icon: Icon,
    label,
    value,
    subValue,
    color,
    isRecent,
    comparison,
  }) => (
    <div
      style={{
        ...styles.card,
        backgroundColor: isRecent ? "#f8fafc" : "#ffffff",
      }}
    >
      <div style={styles.cardHeader}>
        <div
          style={styles.iconBox(
            color === "bg-blue-600"
              ? "#2563eb"
              : color === "bg-red-600"
              ? "#dc2626"
              : color === "bg-purple-600"
              ? "#9333ea"
              : "#ea580c"
          )}
        >
          <Icon size={20} />
        </div>
        {isRecent && (
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "2px 8px",
              borderRadius: "999px",
              fontSize: "10px",
              fontWeight: "700",
            }}
          >
            RECENT
          </span>
        )}
      </div>
      <p style={styles.statLabel}>{label}</p>
      <h3 style={styles.statValue}>{value}</h3>
      {subValue && (
        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
          {subValue}
        </p>
      )}
      {comparison && (
        <div style={styles.trendBadge(comparison.isUp)}>
          {comparison.isUp ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {comparison.label} (평균 대비)
        </div>
      )}
    </div>
  );

  if (loading)
    return (
      <div
        style={{
          ...styles.container,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        로딩 중...
      </div>
    );

  // [로그인 화면]
  if (!user) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div
            style={{
              ...styles.logo,
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Play fill="currentColor" size={40} />
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "800",
              marginBottom: "10px",
              color: "#0f172a",
            }}
          >
            YT-STRATEGIST
          </h1>
          <p style={{ color: "#64748b", marginBottom: "30px" }}>
            데이터 기반 유튜브 채널 분석 및 성장 파트너
          </p>

          {loginMethod === "main" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button onClick={handleGoogleLogin} style={styles.googleButton}>
                <LogIn size={20} /> Google 계정으로 계속하기
              </button>
              <button
                onClick={() => setLoginMethod("email")}
                style={{
                  ...styles.googleButton,
                  marginTop: 0,
                  backgroundColor: "#f1f5f9",
                  border: "none",
                }}
              >
                <Mail size={20} /> 이메일로 로그인
              </button>
              <button
                onClick={() => setLoginMethod("phone")}
                style={{
                  ...styles.googleButton,
                  marginTop: 0,
                  backgroundColor: "#f1f5f9",
                  border: "none",
                }}
              >
                <Phone size={20} /> 전화번호로 로그인
              </button>
            </div>
          )}

          {loginMethod === "email" && (
            <form onSubmit={handleEmailAuth} style={{ textAlign: "left" }}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "6px",
                  }}
                >
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{ ...styles.selectInput, marginBottom: "0" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "6px",
                  }}
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  style={{ ...styles.selectInput, marginBottom: "0" }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  ...styles.buttonPrimary,
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                }}
              >
                {isSignUp ? "회원가입 하기" : "로그인"}
              </button>
              <div
                style={{
                  marginTop: "16px",
                  textAlign: "center",
                  fontSize: "13px",
                }}
              >
                <span
                  style={{ color: "#64748b", cursor: "pointer" }}
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp
                    ? "이미 계정이 있나요? 로그인"
                    : "계정이 없으신가요? 회원가입"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("main");
                  setEmail("");
                  setPassword("");
                }}
                style={{
                  marginTop: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "13px",
                  color: "#94a3b8",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                ← 뒤로 가기
              </button>
            </form>
          )}

          {loginMethod === "phone" && (
            <div style={{ textAlign: "left" }}>
              {!verificationId ? (
                <form onSubmit={requestOtp}>
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "700",
                        marginBottom: "6px",
                      }}
                    >
                      휴대폰 번호
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="01012345678"
                      style={{ ...styles.selectInput, marginBottom: "0" }}
                      required
                    />
                  </div>
                  <div id="recaptcha-container"></div>
                  <button
                    type="submit"
                    style={{
                      ...styles.buttonPrimary,
                      width: "100%",
                      justifyContent: "center",
                      padding: "14px",
                    }}
                  >
                    인증번호 받기
                  </button>
                </form>
              ) : (
                <form onSubmit={verifyOtp}>
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "700",
                        marginBottom: "6px",
                      }}
                    >
                      인증번호 입력
                    </label>
                    <input
                      type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      style={{ ...styles.selectInput, marginBottom: "0" }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      ...styles.buttonPrimary,
                      width: "100%",
                      justifyContent: "center",
                      padding: "14px",
                    }}
                  >
                    인증하기
                  </button>
                </form>
              )}
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("main");
                  setVerificationId(null);
                  setPhoneNumber("");
                }}
                style={{
                  marginTop: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "13px",
                  color: "#94a3b8",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                ← 뒤로 가기
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // [메인 앱 화면]
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <Play fill="currentColor" size={24} /> YT-STRATEGIST
        </div>
        <nav>
          <button
            onClick={() => {
              setActiveTab("overview");
              setSelectedVideo(null);
            }}
            style={styles.navItem(activeTab === "overview")}
          >
            <LayoutDashboard size={20} /> 채널 개요
          </button>
          <button
            onClick={() => {
              setActiveTab("recent");
              setSelectedVideo(null);
            }}
            style={styles.navItem(activeTab === "recent")}
          >
            <Activity size={20} /> 최근 성과
          </button>
          <button
            onClick={() => {
              setActiveTab("golden_time");
              setSelectedVideo(null);
            }}
            style={styles.navItem(activeTab === "golden_time")}
          >
            <Timer size={20} /> 골든타임 분석
          </button>
          <button
            onClick={() => {
              setActiveTab("golden_entry");
              setSelectedVideo(null);
            }}
            style={styles.navItem(activeTab === "golden_entry")}
          >
            <Edit3 size={20} /> 골든타임 입력
          </button>
          <button
            onClick={() => {
              setActiveTab("library");
              setSelectedVideo(null);
            }}
            style={styles.navItem(activeTab === "library")}
          >
            <List size={20} /> 콘텐츠 보관함
          </button>
          <button
            onClick={() => setActiveTab("import")}
            style={styles.navItem(activeTab === "import")}
          >
            <PlusCircle size={20} /> 데이터 업로드
          </button>
        </nav>
        <div
          style={{
            marginTop: "auto",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
              ) : (
                <UserCircle size={32} />
              )}
              <div style={{ overflow: "hidden", maxWidth: "100px" }}>
                <p
                  style={{
                    fontWeight: "700",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.displayName ||
                    user.email ||
                    user.phoneNumber ||
                    "사용자"}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email || "No Email"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#94a3b8",
                padding: "4px",
              }}
              title="로그아웃"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>
              {selectedVideo
                ? "콘텐츠 상세 분석"
                : activeTab === "overview"
                ? "채널 전략 대시보드"
                : activeTab === "recent"
                ? "최근 트렌드 분석"
                : activeTab === "golden_time"
                ? "골든타임 트래커 (48H)"
                : activeTab === "golden_entry"
                ? "초반 48시간 데이터 입력"
                : activeTab === "library"
                ? "콘텐츠 보관함"
                : "데이터 업로드"}
            </h1>
            <p style={styles.subtitle}>
              {selectedVideo
                ? selectedVideo.title
                : "데이터 기반 의사결정 지원 시스템"}
            </p>
          </div>
          {selectedVideo && (
            <button
              onClick={() => setSelectedVideo(null)}
              style={styles.backButton}
            >
              <ArrowLeft size={16} /> 목록으로
            </button>
          )}
        </header>

        {activeTab === "overview" && !selectedVideo && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            {videos.length === 0 ? (
              <div style={{ ...styles.uploadBox, cursor: "default" }}>
                <Database
                  size={48}
                  color="#fb923c"
                  style={{ margin: "0 auto 16px" }}
                />
                <h3>데이터가 없습니다</h3>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>
                  데이터 업로드 탭에서 엑셀 파일을 등록해주세요.
                </p>
                <button
                  onClick={() => setActiveTab("import")}
                  style={styles.buttonPrimary}
                >
                  업로드 하러가기
                </button>
              </div>
            ) : (
              <>
                {/* All Time Section */}
                <div style={styles.firstSectionTitle}>
                  <Database size={20} /> 채널 누적 성과 (All-Time)
                </div>
                <div style={styles.statGrid}>
                  <StatCard
                    icon={Play}
                    label="총 노출수"
                    value={totalStats.impressions.toLocaleString()}
                    color="bg-blue-600"
                  />
                  <StatCard
                    icon={Eye}
                    label="총 조회수"
                    value={totalStats.views.toLocaleString()}
                    color="bg-red-600"
                  />
                  <StatCard
                    icon={MousePointer2}
                    label="평균 CTR"
                    value={`${avgCtr}%`}
                    color="bg-purple-600"
                  />
                  <StatCard
                    icon={Clock}
                    label="평균 조회율"
                    value={`${avgRetention}%`}
                    color="bg-orange-600"
                  />
                </div>

                <div style={{ ...styles.card, marginBottom: "24px" }}>
                  <h3 style={{ ...styles.firstSectionTitle, fontSize: "16px" }}>
                    👑 역대 인기 동영상 (TOP 10)
                  </h3>
                  <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...videos]
                          .sort((a, b) => b.views - a.views)
                          .slice(0, 10)}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="title" hide />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Bar
                          dataKey="views"
                          fill="#2563eb"
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Separate Recent Tab */}
        {activeTab === "recent" && !selectedVideo && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            {videos.length === 0 ? (
              <p style={{ textAlign: "center", color: "#64748b" }}>
                데이터가 없습니다.
              </p>
            ) : (
              <>
                <div style={styles.firstSectionTitle}>
                  <Activity size={20} color="#ef4444" /> 최근 2주간 퍼포먼스
                </div>
                <div style={styles.statGrid}>
                  <StatCard
                    icon={Play}
                    label="최근 영상 수"
                    value={`${recentVideos.length}개`}
                    color="bg-slate-500"
                    isRecent
                  />
                  <StatCard
                    icon={Eye}
                    label="최근 조회수 합계"
                    value={recentStatsSum.views.toLocaleString()}
                    color="bg-red-500"
                    isRecent
                  />
                  <StatCard
                    icon={MousePointer2}
                    label="최근 평균 CTR"
                    value={`${avgRecentCtr}%`}
                    color="bg-purple-500"
                    isRecent
                  />
                  <StatCard
                    icon={Clock}
                    label="최근 평균 조회율"
                    value={`${avgRecentRetention}%`}
                    color="bg-orange-500"
                    isRecent
                  />
                </div>

                <div style={{ ...styles.card, marginBottom: "24px" }}>
                  <h3 style={{ ...styles.firstSectionTitle, fontSize: "16px" }}>
                    📈 최근 동향 분석 (조회수 vs 클릭률)
                  </h3>
                  <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={recentVideos.length > 0 ? recentVideos : []}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="title" hide />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          stroke="#ef4444"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#8b5cf6"
                          domain={[0, 30]}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="views"
                          name="조회수"
                          fill="#ef4444"
                          radius={[4, 4, 0, 0]}
                          barSize={20}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="ctr"
                          name="CTR (%)"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  {recentVideos.length === 0 && (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        marginTop: "-150px",
                      }}
                    >
                      최근 2주간 데이터가 없습니다.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Golden Time Tab */}
        {activeTab === "golden_time" && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            {videos.length === 0 ? (
              <p style={{ textAlign: "center", color: "#64748b" }}>
                분석할 영상이 없습니다. 데이터를 먼저 업로드해주세요.
              </p>
            ) : (
              <>
                <div style={{ ...styles.card, marginBottom: "24px" }}>
                  <label
                    style={{
                      fontWeight: "700",
                      display: "block",
                      marginBottom: "8px",
                      color: "#334155",
                    }}
                  >
                    분석할 영상 선택
                  </label>
                  <select
                    style={styles.selectInput}
                    value={goldenVideoId}
                    onChange={(e) => setGoldenVideoId(e.target.value)}
                  >
                    <option value="">영상을 선택하세요...</option>
                    {sortedVideos.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>

                  {/* 업로드 시간 입력 필드 추가 */}
                  <label
                    style={{
                      fontWeight: "700",
                      display: "block",
                      marginBottom: "8px",
                      color: "#334155",
                      marginTop: "12px",
                    }}
                  >
                    업로드 시간 설정 (시간대 자동 계산)
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="datetime-local"
                      style={{
                        ...styles.selectInput,
                        marginBottom: 0,
                        maxWidth: "250px",
                      }}
                      value={uploadTime}
                      onChange={(e) => setUploadTime(e.target.value)}
                    />
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      * 설정 시 차트와 테이블에 실제 시간대가 표시됩니다.
                    </span>
                  </div>
                </div>

                {goldenVideoId && (
                  <>
                    <div style={{ ...styles.card, marginBottom: "24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <h3
                          style={{
                            ...styles.firstSectionTitle,
                            margin: 0,
                            fontSize: "16px",
                          }}
                        >
                          🚀 초반 48시간 노출/조회 흐름 (
                          {isManualGoldenData
                            ? "실측 데이터"
                            : "예상 시뮬레이션"}
                          )
                        </h3>
                        {!isManualGoldenData && (
                          <button
                            onClick={() => {
                              setEntryVideoId(goldenVideoId);
                              setActiveTab("golden_entry");
                            }}
                            style={styles.buttonSecondary}
                          >
                            <Edit3 size={14} /> 실데이터 입력하기
                          </button>
                        )}
                      </div>
                      <div style={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={chartDataWithTime}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis
                              dataKey={uploadTime ? "displayTime" : "hour"}
                              interval={3}
                              style={{ fontSize: "11px" }}
                            />
                            <YAxis yAxisId="left" />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              domain={[0, 35]}
                            />
                            <Tooltip
                              contentStyle={{
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Legend />
                            <Area
                              yAxisId="left"
                              type="monotone"
                              dataKey="cumImps"
                              name="누적 노출수"
                              stroke="#3b82f6"
                              fillOpacity={0.2}
                              fill="#3b82f6"
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="cumViews"
                              name="누적 조회수"
                              stroke="#ef4444"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="ctr"
                              name="CTR (%)"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                      {!isManualGoldenData && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginTop: "12px",
                            textAlign: "center",
                          }}
                        >
                          * 현재 실측 데이터가 없어, 총 조회수 기반으로 CTR 30%
                          미만의 예상 패턴을 표시합니다.
                        </p>
                      )}
                    </div>

                    <div style={styles.card}>
                      <h3
                        style={{
                          ...styles.firstSectionTitle,
                          fontSize: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        📋 시간대별 상세 데이터
                      </h3>
                      <div style={styles.tableContainer}>
                        <table style={styles.table}>
                          <thead>
                            <tr>
                              <th style={styles.thSticky}>구분</th>
                              {goldenData.map((row) => (
                                <th key={row.hour} style={styles.th}>
                                  {uploadTime
                                    ? getDisplayTime(row.rawHour)
                                    : row.hour}
                                  {uploadTime && (
                                    <div
                                      style={{
                                        fontSize: "10px",
                                        color: "#94a3b8",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      ({row.hour})
                                    </div>
                                  )}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={styles.tdSticky}>시간대별 노출수</td>
                              {goldenData.map((row) => (
                                <td
                                  key={row.hour}
                                  style={{ ...styles.td, position: "relative" }}
                                >
                                  {row.isAnomaly && (
                                    <span style={styles.anomalyBadge}>
                                      ⚡ 급반등
                                    </span>
                                  )}
                                  +{row.hourlyImps.toLocaleString()}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td style={styles.tdSticky}>누적 노출수</td>
                              {goldenData.map((row) => (
                                <td
                                  key={row.hour}
                                  style={{
                                    ...styles.td,
                                    fontWeight: "bold",
                                    color: "#3b82f6",
                                  }}
                                >
                                  {row.cumImps.toLocaleString()}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td style={styles.tdSticky}>노출 상승률</td>
                              {goldenData.map((row) => (
                                <td key={row.hour} style={styles.td}>
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: "bold",
                                      color:
                                        parseFloat(row.growthRate) > 0
                                          ? "#166534"
                                          : "#991b1b",
                                      backgroundColor:
                                        parseFloat(row.growthRate) > 0
                                          ? "#dcfce7"
                                          : "#fee2e2",
                                      padding: "2px 6px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {parseFloat(row.growthRate) > 0 ? "+" : ""}
                                    {row.growthRate}%
                                  </span>
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td style={styles.tdSticky}>CTR</td>
                              {goldenData.map((row) => (
                                <td
                                  key={row.hour}
                                  style={{ ...styles.td, fontWeight: "bold" }}
                                >
                                  {row.ctr}%
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td style={styles.tdSticky}>누적 조회수</td>
                              {goldenData.map((row) => (
                                <td
                                  key={row.hour}
                                  style={{
                                    ...styles.td,
                                    color: "#ef4444",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {row.cumViews.toLocaleString()}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Golden Data Entry Tab */}
        {activeTab === "golden_entry" && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            <div style={{ ...styles.card, marginBottom: "24px" }}>
              <label
                style={{
                  fontWeight: "700",
                  display: "block",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                데이터를 입력할 영상 선택
              </label>
              <select
                style={styles.selectInput}
                value={entryVideoId}
                onChange={(e) => setEntryVideoId(e.target.value)}
              >
                <option value="">영상을 선택하세요...</option>
                {sortedVideos.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>

            {entryVideoId && (
              <div style={styles.card}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      ...styles.firstSectionTitle,
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    📝 누적 데이터 입력 (유튜브 스튜디오 기준)
                  </h3>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setShowAllHours(!showAllHours)}
                      style={styles.buttonSecondary}
                    >
                      {showAllHours ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      {showAllHours
                        ? "주요 시간대만 보기"
                        : "48시간 전체 펼치기"}
                    </button>
                    <button
                      onClick={saveEntryData}
                      style={styles.buttonPrimary}
                    >
                      <Save size={16} /> 저장하기
                    </button>
                  </div>
                </div>

                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.thSticky}>구분</th>
                        {entryData.map((row) => {
                          const mainHours = [1, 2, 3, 6, 12, 24, 48];
                          if (!showAllHours && !mainHours.includes(row.hour))
                            return null;
                          return (
                            <th key={row.hour} style={styles.th}>
                              {row.hour}H
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={styles.tdSticky}>누적 노출수</td>
                        {entryData.map((row, idx) => {
                          const mainHours = [1, 2, 3, 6, 12, 24, 48];
                          if (!showAllHours && !mainHours.includes(row.hour))
                            return null;
                          return (
                            <td key={row.hour} style={styles.td}>
                              <input
                                type="number"
                                value={row.impressions || ""}
                                onChange={(e) =>
                                  handleEntryChange(
                                    idx,
                                    "impressions",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                                style={styles.inputField}
                              />
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td style={styles.tdSticky}>누적 조회수</td>
                        {entryData.map((row, idx) => {
                          const mainHours = [1, 2, 3, 6, 12, 24, 48];
                          if (!showAllHours && !mainHours.includes(row.hour))
                            return null;
                          return (
                            <td key={row.hour} style={styles.td}>
                              <input
                                type="number"
                                value={row.views || ""}
                                onChange={(e) =>
                                  handleEntryChange(
                                    idx,
                                    "views",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                                style={styles.inputField}
                              />
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td style={styles.tdSticky}>계산된 CTR</td>
                        {entryData.map((row) => {
                          const mainHours = [1, 2, 3, 6, 12, 24, 48];
                          if (!showAllHours && !mainHours.includes(row.hour))
                            return null;
                          return (
                            <td
                              key={row.hour}
                              style={{ ...styles.td, color: "#64748b" }}
                            >
                              {row.impressions > 0
                                ? ((row.views / row.impressions) * 100).toFixed(
                                    1
                                  )
                                : 0}
                              %
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "library" && !selectedVideo && (
          <div>
            <div style={styles.toolbar}>
              <span style={{ fontWeight: "700", color: "#334155" }}>
                총 {videos.length}개 영상
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["date", "views", "ctr", "retention"].map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    style={styles.sortButton(sortBy === key)}
                  >
                    {key === "date"
                      ? "최신순"
                      : key === "views"
                      ? "조회수순"
                      : key === "ctr"
                      ? "클릭률순"
                      : "조회율순"}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
                  }
                  style={styles.sortButton(true)}
                >
                  {sortOrder === "desc" ? (
                    <ArrowUpDown size={14} />
                  ) : (
                    <ArrowUpDown
                      size={14}
                      style={{ transform: "rotate(180deg)" }}
                    />
                  )}
                </button>
              </div>
            </div>

            <div style={styles.listHeader}>
              <div>영상 정보</div>
              <div style={{ textAlign: "right" }}>조회수</div>
              <div style={{ textAlign: "right" }}>클릭률</div>
              <div style={{ textAlign: "right" }}>조회율</div>
              <div style={{ textAlign: "center" }}>관리</div>
            </div>

            <div>
              {sortedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  style={styles.listItem}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        ...styles.textTruncate,
                        fontWeight: "700",
                        marginBottom: "4px",
                      }}
                      title={video.title}
                    >
                      {video.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                      {video.date}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: "600" }}>
                    {video.views.toLocaleString()}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      color: video.ctr >= 5 ? "#ef4444" : "#64748b",
                      fontWeight: "700",
                    }}
                  >
                    {video.ctr}%
                  </div>
                  <div style={{ textAlign: "right", color: "#64748b" }}>
                    {video.retention}%
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={(e) => deleteVideo(e, video.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#cbd5e1",
                        padding: "8px",
                      }}
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedVideo && (
          <div style={{ animation: "fadeIn 0.3s" }}>
            <div
              style={{
                ...styles.card,
                marginBottom: "24px",
                backgroundColor: "#f0f9ff",
                borderColor: "#bae6fd",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#0369a1",
                  marginBottom: "8px",
                }}
              >
                📊 비교 기준: 최근 2주 평균 데이터
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  fontSize: "13px",
                  color: "#0c4a6e",
                }}
              >
                <span>
                  평균 조회수:{" "}
                  <strong>{parseInt(avgRecentViews).toLocaleString()}</strong>
                </span>
                <span>
                  평균 노출수:{" "}
                  <strong>
                    {parseInt(avgRecentImpressions).toLocaleString()}
                  </strong>
                </span>
                <span>
                  평균 CTR: <strong>{avgRecentCtr}%</strong>
                </span>
                <span>
                  평균 조회율: <strong>{avgRecentRetention}%</strong>
                </span>
              </div>
            </div>

            <div style={styles.statGrid}>
              <StatCard
                icon={Play}
                label="노출수"
                value={selectedVideo.impressions.toLocaleString()}
                color="bg-blue-600"
                comparison={getTrend(
                  selectedVideo.impressions,
                  avgRecentImpressions
                )}
              />
              <StatCard
                icon={Eye}
                label="조회수"
                value={selectedVideo.views.toLocaleString()}
                color="bg-red-600"
                comparison={getTrend(selectedVideo.views, avgRecentViews)}
              />
              <StatCard
                icon={MousePointer2}
                label="CTR"
                value={`${selectedVideo.ctr}%`}
                color="bg-purple-600"
                comparison={getTrend(selectedVideo.ctr, avgRecentCtr)}
              />
              <StatCard
                icon={Clock}
                label="조회율"
                value={`${selectedVideo.retention}%`}
                color="bg-orange-600"
                comparison={getTrend(
                  selectedVideo.retention,
                  avgRecentRetention
                )}
              />
            </div>

            {/* Daily Trend Graph Section */}
            {selectedVideo.dailyHistory &&
              selectedVideo.dailyHistory.length > 0 && (
                <div style={{ ...styles.card, marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <h3
                      style={{
                        ...styles.firstSectionTitle,
                        margin: 0,
                        fontSize: "16px",
                      }}
                    >
                      📈 일별 지표 추이 분석
                    </h3>
                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      <div
                        onClick={() =>
                          setTrendMetrics((p) => ({ ...p, views: !p.views }))
                        }
                        style={styles.toggleButton(trendMetrics.views)}
                      >
                        {trendMetrics.views ? (
                          <CheckSquare size={14} />
                        ) : (
                          <Square size={14} />
                        )}{" "}
                        조회수
                      </div>
                      <div
                        onClick={() =>
                          setTrendMetrics((p) => ({
                            ...p,
                            impressions: !p.impressions,
                          }))
                        }
                        style={styles.toggleButton(trendMetrics.impressions)}
                      >
                        {trendMetrics.impressions ? (
                          <CheckSquare size={14} />
                        ) : (
                          <Square size={14} />
                        )}{" "}
                        노출수
                      </div>
                      <div
                        onClick={() =>
                          setTrendMetrics((p) => ({ ...p, ctr: !p.ctr }))
                        }
                        style={styles.toggleButton(trendMetrics.ctr)}
                      >
                        {trendMetrics.ctr ? (
                          <CheckSquare size={14} />
                        ) : (
                          <Square size={14} />
                        )}{" "}
                        CTR
                      </div>
                      <div
                        onClick={() =>
                          setTrendMetrics((p) => ({
                            ...p,
                            retention: !p.retention,
                          }))
                        }
                        style={styles.toggleButton(trendMetrics.retention)}
                      >
                        {trendMetrics.retention ? (
                          <CheckSquare size={14} />
                        ) : (
                          <Square size={14} />
                        )}{" "}
                        조회율
                      </div>
                    </div>
                  </div>
                  <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedVideo.dailyHistory}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="date"
                          fontSize={11}
                          tickFormatter={(str) => str.slice(5)}
                        />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 30]}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                        {trendMetrics.views && (
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="views"
                            name="조회수"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )}
                        {trendMetrics.impressions && (
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="impressions"
                            name="노출수"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )}
                        {trendMetrics.ctr && (
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="ctr"
                            name="CTR (%)"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )}
                        {trendMetrics.retention && (
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="retention"
                            name="조회율 (%)"
                            stroke="#f97316"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              <div style={styles.card}>
                <h3 style={styles.firstSectionTitle}>성과 퍼널</h3>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer>
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: "노출", value: selectedVideo.impressions },
                        { name: "조회", value: selectedVideo.views },
                      ]}
                    >
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={40} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        radius={[0, 4, 4, 0]}
                        barSize={40}
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={styles.card}>
                <h3 style={styles.firstSectionTitle}>채널 평균 비교 (CTR)</h3>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={[
                        { name: "평균", value: parseFloat(avgCtr) },
                        { name: "이 영상", value: selectedVideo.ctr },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                        <Cell fill="#94a3b8" />
                        <Cell
                          fill={
                            selectedVideo.ctr >= parseFloat(avgCtr)
                              ? "#ef4444"
                              : "#f59e0b"
                          }
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "import" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={styles.uploadBox}>
              <FileSpreadsheet
                size={48}
                color="#ef4444"
                style={{ marginBottom: "16px" }}
              />
              <h3 style={styles.title}>데이터 업로드</h3>
              <p style={{ color: "#64748b", margin: "16px 0 24px" }}>
                유튜브 스튜디오 엑셀 파일을 업로드하세요.
              </p>

              {/* 데이터 기준일 설정 */}
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "left",
                  backgroundColor: "#f8fafc",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    color: "#334155",
                  }}
                >
                  📅 데이터 기준일 (이 날짜로 히스토리가 저장됩니다)
                </label>
                <input
                  type="date"
                  value={referenceDate}
                  onChange={(e) => setReferenceDate(e.target.value)}
                  style={{ ...styles.selectInput, marginBottom: 0 }}
                />
              </div>

              {parsingError && (
                <p
                  style={{
                    color: "#ef4444",
                    marginBottom: "16px",
                    fontSize: "14px",
                  }}
                >
                  {parsingError}
                </p>
              )}

              <input
                type="file"
                id="file"
                hidden
                accept=".csv, .xlsx, .xls"
                onChange={handleFileUpload}
              />
              <label htmlFor="file" style={styles.buttonPrimary}>
                <Upload size={18} /> {fileName || "파일 선택하기"}
              </label>
            </div>

            {importData.length > 0 && (
              <div
                style={{
                  marginTop: "24px",
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontWeight: "700", color: "#22c55e" }}>
                    ✓ {importData.length}개 분석 완료
                  </span>
                  <button
                    onClick={saveBatchData}
                    disabled={isUploading}
                    style={styles.buttonPrimary}
                  >
                    {isUploading ? "저장 중..." : "DB에 저장"}
                  </button>
                </div>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      fontSize: "13px",
                      textAlign: "left",
                    }}
                  >
                    <thead>
                      <tr style={{ color: "#64748b" }}>
                        <th>게시일</th>
                        <th>제목</th>
                        <th>조회수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importData.map((d, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: "1px solid #f1f5f9" }}
                        >
                          <td style={{ padding: "8px 0" }}>{d.date}</td>
                          <td
                            style={{
                              padding: "8px 0",
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {d.title}
                          </td>
                          <td style={{ padding: "8px 0" }}>{d.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
