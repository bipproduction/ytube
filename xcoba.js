function extractTextFromURL(url) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const text = lastPart.split("?")[0];
    return decodeURIComponent(text);
}

const text = extractTextFromURL('https://shopee.co.id/Lenovo-Thinkplus-Earphone-Nirkabel-Bluetooth-Konduksi-Tulang-TWS-Headset-V5.3-Noise-Reduce-Music-Game-Headphone-100-Original-i.863923375.22656798928??publish_id=&sp_atk=92df439b-e456-4c8a-be20-edd20ff3c113&xptdk=92df439b-e456-4c8a-be20-edd20ff3c113')
console.log(text)