from flask import Flask, Response, jsonify, render_template
import os


asgi_app = Flask(__name__)


@asgi_app.route("/")
def home():
    return render_template("index.html", title="DariX — IT-решения")


@asgi_app.route("/privacy")
def privacy():
    return render_template("privacy.html", title="DariX — IT-решения")


@asgi_app.route("/robots.txt")
def robots_txt():
    content = """User-agent: *
Allow: /

Sitemap: https://darixteam.ru/sitemap.xml
"""
    return Response(content, mimetype="text/plain")


@asgi_app.route("/sitemap.xml")
def sitemap_xml():
    content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://darixteam.ru/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://darixteam.ru/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
"""
    return Response(content, mimetype="application/xml")


@asgi_app.route("/health_check")
def health_check():
    return jsonify({"ok": True})


# ---------------- Run ----------------
if __name__ == '__main__':
    asgi_app.run(debug=False, port=os.getenv("SITE_PORT"), host="0.0.0.0")
