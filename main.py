# тут чисто выставка рекламы в тг бота
import requests
import json
from secret import ADSGRAM_URL, TGID, BLOCKID, LANGUAGE, TOKEN, BOT_TOKEN

params = {
    "tgid": TGID,
    "blockid": BLOCKID,
    "language": LANGUAGE,
    "token": TOKEN,
}

print("URL:", ADSGRAM_URL)
print("TGID:", TGID)
print("BLOCKID:", BLOCKID)
print("LANGUAGE:", LANGUAGE)
print("TOKEN raw:", TOKEN)
print("TOKEN repr:", repr(TOKEN))
print("len:", len(TOKEN))
response = requests.get(ADSGRAM_URL, params=params, timeout=10)
print(response.status_code)
print(response.text)

ad = response.json()

print(ad)

text_html = ad["text_html"]
image_url = ad["image_url"]
click_url = ad["click_url"]
button_name = ad["button_name"]
reward_url = ad["reward_url"]
button_reward_name = ad["button_reward_name"]

caption = text_html.replace("\\u003c", "<").replace("\\u003e", ">")

print(text_html)

import json

with open("ad_cache.json", "w", encoding="utf-8") as f:
    json.dump(ad, f, ensure_ascii=False, indent=2)