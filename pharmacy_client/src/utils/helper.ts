import { toast } from "react-toastify";

export const notify = (message) => toast(message);
export const notifyError = (message) => {
    toast.error(message); 
};

export const getKeyWord = (keyWord, languageKeyWords, language) => {
    if(!languageKeyWords){
        return keyWord
    }
    return languageKeyWords?.[keyWord]?.[language]? languageKeyWords?.[keyWord]?.[language]:languageKeyWords?.[keyWord]?.['english']
}