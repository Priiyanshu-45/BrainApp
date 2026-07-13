export const random = (len: number) => {
    const options = "qwertyuioplkjhgfdsazxcvbnm1234567890";
    let str = "";
    for(let i = 0; i<len; i++){
        let randomIndex = Math.floor(Math.random() * options.length);
        str += options[randomIndex];
    }
    return str;
}