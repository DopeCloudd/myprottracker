import {
  previewFile,
  removeFile,
  selectedFile,
  setFile,
} from "@/application/redux/slices/file.slice";
import { useAppDispatch } from "@/application/redux/store";
import { useSelector } from "react-redux";

const useFile = () => {
  const dispatch = useAppDispatch();
  const file = useSelector(selectedFile);
  const preview = useSelector(previewFile);

  const addFile = (blobData: number[], mimeType: string, fileName: string) => {
    const uint8Array = new Uint8Array(blobData);
    const blob = new Blob([uint8Array], { type: mimeType });
    const fileObject = new File([blob], fileName, { type: mimeType });
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setFile({ file: fileObject, preview: reader.result as string }));
    };
    reader.readAsDataURL(fileObject);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUpload = event.target.files?.[0];
    if (fileUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          setFile({ file: fileUpload, preview: reader.result as string })
        );
      };
      reader.readAsDataURL(fileUpload);
    }
  };

  const handleRemoveFile = () => {
    dispatch(removeFile());
  };

  return {
    file,
    preview,
    handleFileChange,
    addFile,
    handleRemoveFile,
  };
};

export default useFile;
