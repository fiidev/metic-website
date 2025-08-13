"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faCode,
  faShoppingBag,
  faBullhorn,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    nisn: "",

    // Division & Motivation
    firstChoice: "",
    secondChoice: "",
    motivation: "",
    experience: "",
    selectedRole: "",

    // Portfolio & Documents
    portfolio: "",

    // Availability
    // availability: "",
    commitment: "",
    expectations: "",

    // Agreement
    agreeTerms: false,
    agreeCommitment: false,
  });

  const steps = [
    {
      id: 1,
      title: "Data Pribadi",
      description: "Informasi dasar tentang diri Anda",
    },
    {
      id: 2,
      title: "Pilihan Divisi",
      description: "Pilih divisi dan motivasi bergabung",
    },
    {
      id: 3,
      title: "Portfolio",
      description: "Link portfolio atau karya Anda",
    },
    { id: 4, title: "Komitmen", description: "Ketersediaan dan ekspektasi" },
    {
      id: 5,
      title: "Konfirmasi",
      description: "Review dan submit pendaftaran",
    },
  ];

  const divisions = [
    {
      id: "moklet-dev",
      name: "Moklet Dev",
      description: "Fokus pada pengembangan teknologi (App, Web, IoT, AI)",
      icon: faCode,
      roles: [
        {
          id: "frontend-dev",
          name: "Frontend Developer",
          jobdesk:
            "Mengembangkan antarmuka pengguna aplikasi web menggunakan framework modern seperti React/Next.js.",
        },
        {
          id: "backend-dev",
          name: "Backend Developer",
          jobdesk:
            "Membangun dan memelihara logika sisi server, database, dan API untuk aplikasi.",
        },
        {
          id: "ui-ux-designer",
          name: "UI/UX Designer",
          jobdesk:
            "Merancang antarmuka pengguna yang intuitif dan pengalaman pengguna yang menarik.",
        },
        {
          id: "ai-engineer",
          name: "AI Engineer",
          jobdesk:
            "Mengembangkan dan menerapkan model AI serta solusi pembelajaran mesin.",
        },
        {
          id: "iot-developer",
          name: "IoT Developer",
          jobdesk:
            "Menciptakan solusi perangkat lunak dan keras untuk perangkat Internet of Things.",
        },
      ],
    },
    {
      id: "metic-merch",
      name: "Metic Merch",
      description: "Fokus pada bisnis dan produk kreatif",
      icon: faShoppingBag,
      roles: [
        {
          id: "production-crew",
          name: "Production Crew",
          jobdesk:
            "Mengelola proses produksi merchandise, memastikan kualitas dan pengiriman tepat waktu.",
        },
        {
          id: "graphics-designer",
          name: "Graphics Designer",
          jobdesk:
            "Merancang konsep dan visual untuk produk merchandise dan materi promosi.",
        },
        {
          id: "sales-marketing",
          name: "Sales and Marketing",
          jobdesk:
            "Mengembangkan strategi untuk mempromosikan dan menjual merchandise, serta berinteraksi dengan pelanggan.",
        },
        {
          id: "purchasing",
          name: "Purchasing",
          jobdesk:
            "Bertanggung jawab untuk mencari bahan baku dan mengelola hubungan dengan pemasok untuk produksi merchandise.",
        },
        {
          id: "finance",
          name: "Finance",
          jobdesk:
            "Mengelola transaksi keuangan, penganggaran, dan pelaporan untuk operasional merchandise.",
        },
      ],
    },
    {
      id: "mediacom",
      name: "MedCom",
      description: "Fokus pada media digital, branding, dan komunikasi",
      icon: faBullhorn,
      roles: [
        {
          id: "content-writer",
          name: "Content Writer",
          jobdesk:
            "Membuat konten tulisan yang menarik untuk berbagai platform digital.",
        },
        {
          id: "video-editor",
          name: "Video Editor",
          jobdesk:
            "Mengedit dan memproduksi konten video untuk pemasaran dan komunikasi.",
        },
        {
          id: "KOL",
          name: "Key Opinion Leader",
          jobdesk:
            "Menjadi representatif dan akan sering muncul di depan kamera untuk promosi dan branding.",
        },
        {
          id: "broadcaster",
          name: "Broadcaster",
          jobdesk: "Mengelola siaran langsung dan produksi konten audio.",
        },
        {
          id: "graphics-designer-mc",
          name: "Graphics Designer",
          jobdesk:
            "Membuat grafis visual dan ilustrasi untuk media digital dan cetak, khusus untuk kebutuhan komunikasi.",
        },
      ],
    },
  ];

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          alert("Nama Lengkap harus diisi");
          return false;
        }
        if (!formData.email.trim()) {
          alert("Email harus diisi");
          return false;
        }
        if (!formData.phone.trim()) {
          alert("No. WhatsApp harus diisi");
          return false;
        }
        if (!formData.nisn.trim()) {
          alert("NISN harus diisi");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          alert("Format email tidak valid");
          return false;
        }
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
        if (!phoneRegex.test(formData.phone)) {
          alert(
            "Format nomor WhatsApp tidak valid (gunakan format: 08xxxxxxxxxx)"
          );
          return false;
        }
        return true;

      case 2:
        if (!formData.firstChoice) {
          alert("Pilihan Divisi Pertama harus dipilih");
          return false;
        }
        if (!formData.selectedRole) {
          alert("Role harus dipilih");
          return false;
        }
        if (!formData.motivation.trim()) {
          alert("Motivasi Bergabung harus diisi");
          return false;
        }
        if (formData.motivation.trim().length < 50) {
          alert("Motivasi bergabung minimal 50 karakter");
          return false;
        }
        return true;

      case 3:
        return true;

      case 4:
        // if (!formData.availability) {
        //   alert("Ketersediaan Waktu harus dipilih");
        //   return false;
        // }
        if (!formData.commitment.trim()) {
          alert("Komitmen Anda harus diisi");
          return false;
        }
        if (!formData.expectations.trim()) {
          alert("Ekspektasi dari METIC harus diisi");
          return false;
        }
        if (formData.commitment.trim().length < 30) {
          alert("Komitmen minimal 30 karakter");
          return false;
        }
        if (formData.expectations.trim().length < 30) {
          alert("Ekspektasi minimal 30 karakter");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          formData.fullName.trim() &&
          formData.email.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
          formData.phone.trim() &&
          /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(formData.phone) &&
          formData.nisn.trim()
        );
      case 2:
        return (
          formData.firstChoice &&
          formData.selectedRole &&
          formData.motivation.trim().length >= 50
        );
      case 3:
        return true;
      case 4:
        return (
          // formData.availability &&
          formData.commitment.trim().length >= 30 &&
          formData.expectations.trim().length >= 30
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const requiredFields = [
      { field: formData.fullName, name: "Nama Lengkap" },
      { field: formData.email, name: "Email" },
      { field: formData.phone, name: "No. WhatsApp" },
      { field: formData.nisn, name: "NISN" },
      { field: formData.firstChoice, name: "Pilihan Divisi Pertama" },
      { field: formData.selectedRole, name: "Role" },
      { field: formData.motivation, name: "Motivasi" },
      // { field: formData.availability, name: "Ketersediaan Waktu" },
      { field: formData.commitment, name: "Komitmen" },
      { field: formData.expectations, name: "Ekspektasi" },
    ];

    const missingFields = requiredFields.filter(
      (item) => !item.field || item.field.trim() === ""
    );

    if (missingFields.length > 0) {
      alert(
        `Mohon lengkapi field berikut: ${missingFields
          .map((item) => item.name)
          .join(", ")}`
      );
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms || !formData.agreeCommitment) {
      alert("Mohon centang kedua persetujuan sebelum melanjutkan.");
      setIsLoading(false);
      return;
    }

    try {
      const url =
        "https://script.google.com/macros/s/AKfycbwmFz48nttwMPNoEZxbid9HTdZGFtB2WyvRJ4PAxh0w1gQkBPgIaeutRtbBwsOq1PfS/exec";

      const selectedDivision = divisions.find(
        (d) => d.id === formData.firstChoice
      );
      const selectedRole = selectedDivision?.roles.find(
        (r) => r.id === formData.selectedRole
      );
      const secondChoiceDivision = divisions.find(
        (d) => d.id === formData.secondChoice
      );

      const submitData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        nisn: formData.nisn.trim(),
        firstChoice: selectedDivision?.name || "",
        selectedRole: selectedRole?.name || "",
        secondChoice: secondChoiceDivision?.name || "",
        motivation: formData.motivation.trim(),
        experience: formData.experience.trim(),
        portfolio: formData.portfolio.trim(),
        // availability: formData.availability,
        commitment: formData.commitment.trim(),
        expectations: formData.expectations.trim(),
        timestamp: new Date().toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      const formDataToSend = new FormData();
      Object.keys(submitData).forEach((key) => {
        formDataToSend.append(key, submitData[key as keyof typeof submitData]);
      });

      let response;
      try {
        response = await fetch(url, {
          method: "POST",
          body: formDataToSend,
        });
      } catch {
        const urlParams = new URLSearchParams();
        Object.keys(submitData).forEach((key) => {
          urlParams.append(key, submitData[key as keyof typeof submitData]);
        });

        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlParams.toString(),
        });
      }

      if (response && response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error(
          `Server responded with status: ${response?.status || "unknown"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      let errorMessage =
        "Terjadi kesalahan saat mengirim data ke Google Sheets.";

      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage =
          "Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.";
      } else if (error instanceof Error) {
        if (error.message.includes("CORS")) {
          errorMessage =
            "Terjadi masalah CORS. Pastikan Google Apps Script sudah di-deploy dengan benar.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }

      alert(
        `${errorMessage}\n\nJika masalah berlanjut, silakan hubungi admin.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap *
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  !formData.fullName.trim()
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#A10000]"
                }`}
              />
              {!formData.fullName.trim() && (
                <p className="text-sm text-red-600">Nama lengkap wajib diisi</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="nama@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    !formData.email.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#A10000]"
                  }`}
                />
                {!formData.email.trim() && (
                  <p className="text-sm text-red-600">Email wajib diisi</p>
                )}
                {formData.email.trim() &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <p className="text-sm text-red-600">
                      Format email tidak valid
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  No. WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    !formData.phone.trim() ||
                    !/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(formData.phone)
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#A10000]"
                  }`}
                />
                {!formData.phone.trim() && (
                  <p className="text-sm text-red-600">
                    No. WhatsApp wajib diisi
                  </p>
                )}
                {formData.phone.trim() &&
                  !/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(formData.phone) && (
                    <p className="text-sm text-red-600">
                      Format nomor tidak valid (gunakan: 08xxxxxxxxxx)
                    </p>
                  )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  NISN *
                </label>
                <input
                  type="text"
                  placeholder="Nomor Induk Siswa Nasional"
                  value={formData.nisn}
                  onChange={(e) =>
                    setFormData({ ...formData, nisn: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    !formData.nisn.trim()
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#A10000]"
                  }`}
                />
                {!formData.nisn.trim() && (
                  <p className="text-sm text-red-600">NISN wajib diisi</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        const selectedDivision = divisions.find(
          (d) => d.id === formData.firstChoice
        );
        const selectedRole = selectedDivision?.roles.find(
          (r) => r.id === formData.selectedRole
        );

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Pilihan Divisi Pertama *
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {divisions.map((division) => (
                  <div
                    key={division.id}
                    className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-200 hover:border-[#A10000] ${
                      formData.firstChoice === division.id
                        ? "border-[#A10000] bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        firstChoice: division.id,
                        selectedRole: "",
                      })
                    }>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                        <FontAwesomeIcon
                          icon={division.icon}
                          className="text-[#A10000] text-xl"
                        />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {division.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {division.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {!formData.firstChoice && (
                <p className="text-sm text-red-600">
                  Pilihan divisi pertama wajib dipilih
                </p>
              )}
            </div>

            {formData.firstChoice && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Pilih Role *
                </label>
                <select
                  value={formData.selectedRole}
                  onChange={(e) =>
                    setFormData({ ...formData, selectedRole: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    !formData.selectedRole
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#A10000]"
                  }`}>
                  <option value="">Pilih role dalam divisi ini</option>
                  {selectedDivision?.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {!formData.selectedRole && (
                  <p className="text-sm text-red-600">Role wajib dipilih</p>
                )}
              </div>
            )}

            {formData.selectedRole && selectedRole && (
              <div className="bg-gray-50 border-0 shadow-sm rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Deskripsi Pekerjaan
                </h4>
                <p className="text-sm text-gray-700">{selectedRole.jobdesk}</p>
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Pilihan Divisi Kedua (Opsional)
              </label>
              <select
                value={formData.secondChoice}
                onChange={(e) =>
                  setFormData({ ...formData, secondChoice: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A10000] transition-colors">
                <option value="">Pilih divisi alternatif</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Motivasi Bergabung *
              </label>
              <textarea
                rows={4}
                placeholder="Ceritakan mengapa Anda ingin bergabung dengan METIC dan divisi yang dipilih..."
                value={formData.motivation}
                onChange={(e) =>
                  setFormData({ ...formData, motivation: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                  !formData.motivation.trim() ||
                  formData.motivation.trim().length < 50
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#A10000]"
                }`}
              />
              <div className="flex justify-between text-sm">
                <div>
                  {!formData.motivation.trim() && (
                    <span className="text-red-600">Motivasi wajib diisi</span>
                  )}
                  {formData.motivation.trim() &&
                    formData.motivation.trim().length < 50 && (
                      <span className="text-red-600">Minimal 50 karakter</span>
                    )}
                </div>
                <span
                  className={`${
                    formData.motivation.length < 50
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}>
                  {formData.motivation.length}/50 minimum
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Pengalaman Relevan
              </label>
              <textarea
                rows={3}
                placeholder="Ceritakan pengalaman Anda yang relevan dengan divisi pilihan (organisasi, project, dll)..."
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A10000] transition-colors resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Link Portfolio/GitHub (Opsional)
              </label>
              <input
                type="url"
                placeholder="https://github.com/username atau https://portfolio.com"
                value={formData.portfolio}
                onChange={(e) =>
                  setFormData({ ...formData, portfolio: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A10000] transition-colors"
              />
              <p className="text-sm text-gray-500">
                Jika ada, sertakan link ke portfolio, GitHub, atau karya Anda
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3">
                Tips untuk Portfolio:
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  • Sertakan project terbaik yang relevan dengan divisi pilihan
                </li>
                <li>• Gunakan README yang jelas untuk project GitHub</li>
                <li>• Tunjukkan proses dan hasil karya Anda</li>
                <li>• Sertakan teknologi/tools yang digunakan</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Ketersediaan Waktu *
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "full-time",
                    label: "Full-time (bisa aktif setiap hari)",
                  },
                  {
                    value: "part-time",
                    label: "Part-time (aktif beberapa hari dalam seminggu)",
                  },
                  {
                    value: "weekend",
                    label: "Weekend only (hanya akhir pekan)",
                  },
                ].map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={option.value}
                      name="availability"
                      value={option.value}
                      checked={formData.availability === option.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                      className="w-4 h-4 text-[#A10000] border-gray-300 focus:ring-[#A10000]"
                    />
                    <label
                      htmlFor={option.value}
                      className="text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {!formData.availability && (
                <p className="text-sm text-red-600">
                  Ketersediaan waktu wajib dipilih
                </p>
              )}
            </div> */}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Komitmen Anda *
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan komitmen Anda terhadap METIC dan bagaimana Anda akan berkontribusi..."
                value={formData.commitment}
                onChange={(e) =>
                  setFormData({ ...formData, commitment: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                  !formData.commitment.trim() ||
                  formData.commitment.trim().length < 30
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#A10000]"
                }`}
              />
              <div className="flex justify-between text-sm">
                <div>
                  {!formData.commitment.trim() && (
                    <span className="text-red-600">Komitmen wajib diisi</span>
                  )}
                  {formData.commitment.trim() &&
                    formData.commitment.trim().length < 30 && (
                      <span className="text-red-600">Minimal 30 karakter</span>
                    )}
                </div>
                <span
                  className={`${
                    formData.commitment.length < 30
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}>
                  {formData.commitment.length}/30 minimum
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ekspektasi dari METIC *
              </label>
              <textarea
                rows={3}
                placeholder="Apa yang Anda harapkan dari bergabung dengan METIC?"
                value={formData.expectations}
                onChange={(e) =>
                  setFormData({ ...formData, expectations: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                  !formData.expectations.trim() ||
                  formData.expectations.trim().length < 30
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#A10000]"
                }`}
              />
              <div className="flex justify-between text-sm">
                <div>
                  {!formData.expectations.trim() && (
                    <span className="text-red-600">Ekspektasi wajib diisi</span>
                  )}
                  {formData.expectations.trim() &&
                    formData.expectations.trim().length < 30 && (
                      <span className="text-red-600">Minimal 30 karakter</span>
                    )}
                </div>
                <span
                  className={`${
                    formData.expectations.length < 30
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}>
                  {formData.expectations.length}/30 minimum
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-3">
                Catatan Penting:
              </h4>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li>
                  • METIC adalah organisasi yang membutuhkan komitmen tinggi
                </li>
                <li>
                  • Anda akan terlibat dalam project nyata dan deadline ketat
                </li>
                <li>• Keaktifan dan kolaborasi tim sangat diutamakan</li>
                <li>
                  • Ada kemungkinan mendapat insentif dari project yang
                  profitable
                </li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">
                Review Pendaftaran Anda
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-gray-900">
                    Data Pribadi
                  </h4>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="font-medium">Nama:</span>{" "}
                      {formData.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {formData.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {formData.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-gray-900">
                    Pilihan Divisi
                  </h4>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="font-medium">Pilihan 1:</span>{" "}
                      {divisions.find((d) => d.id === formData.firstChoice)
                        ?.name || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Pilihan 2:</span>{" "}
                      {divisions.find((d) => d.id === formData.secondChoice)
                        ?.name || "Tidak ada"}
                    </p>
                    {/* <p>
                      <span className="font-medium">Ketersediaan:</span>{" "}
                      {formData.availability}
                    </p> */}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3 text-gray-900">Motivasi</h4>
                <p className="text-sm text-gray-600 bg-white p-4 rounded border">
                  {formData.motivation || "Belum diisi"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="w-4 h-4 text-[#A10000] border-gray-300 rounded focus:ring-[#A10000]"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Saya setuju dengan syarat dan ketentuan METIC
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="commitment-agree"
                  checked={formData.agreeCommitment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      agreeCommitment: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-[#A10000] border-gray-300 rounded focus:ring-[#A10000]"
                />
                <label
                  htmlFor="commitment-agree"
                  className="text-sm text-gray-700">
                  Saya berkomitmen untuk aktif dan berkontribusi dalam kegiatan
                  METIC
                </label>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-3">Sebelum Submit:</h4>
              <ul className="text-sm text-red-800 space-y-2">
                <li>• Pastikan semua data sudah benar</li>
                <li>• Proses seleksi akan berlangsung 1-2 minggu</li>
                <li>• Anda akan dihubungi via email/WhatsApp</li>
                <li>• Siapkan diri untuk interview dan tes praktik</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border-0 overflow-hidden">
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 text-2xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-gray-600 mb-6">
              Terima kasih telah mendaftar ke METIC. Kami akan menghubungi Anda
              dalam 1-2 minggu untuk proses seleksi selanjutnya.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="w-full inline-block bg-[#A10000] hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="h-4 w-4 text-gray-600"
              />

              <span className="font-bold text-xl text-gray-900">
                Registration member
              </span>
            </Link>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="relative">
            {/* Progress Line Background */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300"></div>
            {/* Active Progress Line */}
            <div
              className="absolute top-4 left-4 h-0.5 bg-[#A10000] transition-all duration-300 ease-in-out"
              style={{
                width:
                  currentStep === 1
                    ? "0rem"
                    : `calc(${
                        ((currentStep - 1) / (steps.length - 1)) * 100
                      }% - 1rem)`,
              }}></div>

            {/* Steps */}
            <div className="relative flex items-center justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center z-10">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-[#A10000] border-[#A10000] text-[#A10000]"
                        : isStepValid(step.id)
                        ? "border-green-500 text-green-600"
                        : "border-gray-300 text-gray-400"
                    }`}>
                    <span className="text-sm font-medium">{step.id}</span>
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-[#A10000]"
                          : isStepValid(step.id)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden">
          <div className="p-8">{renderStepContent()}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 border rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}>
            <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-[#A10000] hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              <span>Next</span>
              <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                !formData.agreeTerms || !formData.agreeCommitment || isLoading
              }
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !formData.agreeTerms || !formData.agreeCommitment || isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#A10000] hover:bg-red-700 text-white"
              }`}>
              {isLoading ? "Submitting..." : "Submit Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
