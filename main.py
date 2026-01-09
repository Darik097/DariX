from flask import Flask, render_template, url_for
import os
import traceback
from datetime import datetime
from flask import Flask, request, jsonify
from telegram import Bot
from telegram.constants import ParseMode
import asyncio


asgi_app = Flask(__name__)


def escape_markdown_v2(text):
    special_chars = r'\_*[]()~`>#+-=|{}.'
    for char in special_chars:
        text = text.replace(char, '\\' + char)
    return text


def send_message(text):
    token = os.getenv("TG_TOKEN")
    chat_id = os.getenv("TG_CHAT_ID")

    bot = Bot(token=token)
    safe_text = escape_markdown_v2(text)
    asyncio.run(bot.send_message(chat_id=chat_id, text=safe_text,
                parse_mode=ParseMode.MARKDOWN_V2))


@asgi_app.route("/")
def home():
    return render_template("index.html", title="DariX — IT-решения")


@asgi_app.route("/privacy")
def privacy():
    return render_template("privacy.html", title="DariX — IT-решения")


@asgi_app.route('/submit_request', methods=['POST'])
def submit_request():
    data = request.get_json()

    name = data.get('name', 'Не указано')
    phone = data.get('phone', 'Не указан')
    message = data.get('message', '')
    timestamp = datetime.now().strftime("%d.%m.%Y %H:%M:%S")

    message_text = f"""
📩 Новая заявка с калькулятора DariX

👤 Источник: {name}
📞 Телефон: {phone}
🕓 Время: {timestamp}

{message}
    """

    try:
        send_message(message_text)
        return jsonify({'result': True})
    except Exception:
        print(traceback.format_exc())
        return jsonify({'result': False}), 500


@asgi_app.route('/consultation_form', methods=['POST'])
def consultation_form():
    """Обработка формы консультации"""
    data = request.get_json()
    name = data.get('name', 'Не указано')
    phone = data.get('phone', 'Не указан')
    timestamp = datetime.now().strftime("%d.%m.%Y %H:%M:%S")

    message_text = f"""
📩 Новая консультация с сайта Darix
👤 Имя: {name}
📞 Телефон: {phone}
🕓 Время заявки: {timestamp}
    """

    try:
        send_message(message_text)
        return jsonify({'result': True})
    except Exception:
        print(traceback.format_exc())
        return jsonify({'result': False}), 500


@asgi_app.route("/health_check")
def health_check():
    return jsonify({"ok": True})


# ---------------- Run ----------------
if __name__ == '__main__':
    asgi_app.run(debug=False, port=os.getenv("SITE_PORT"), host="0.0.0.0")
