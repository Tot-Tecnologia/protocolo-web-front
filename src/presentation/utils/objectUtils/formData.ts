// function convertToFormData(data: Record<string, any>): FormData {
//     const formData = new FormData();
  
//     for (const key in data) {
//       const value = data[key];
  
//       if (key === "arquivos" && Array.isArray(value)) {
//         value.forEach((file: File) => {
//           if (file) {
//             formData.append("arquivos", file);
//           }
//         });
//       } else if (value !== undefined && value !== null) {
//         formData.append(key, String(value));
//       }
//     }
  
//     return formData;
//   }
  