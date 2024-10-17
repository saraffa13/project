import { toast } from "react-toastify";

export const notify = (message:string) => toast(message);

export const getKeyWord = (keyWord:string, languageKeyWords:any, language:any) => {
    return languageKeyWords?.[keyWord]?.[language]? languageKeyWords?.[keyWord]?.[language]:languageKeyWords?.[keyWord]?.['english']
}