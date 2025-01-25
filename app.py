from flask import Flask, render_template, request, jsonify
from mira_sdk import MiraClient, Flow
import os

app = Flask(__name__)

client = MiraClient(config={"API_KEY": "sb-b55907818667805d636940340f42d849"})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_stories', methods=['POST'])
def generate_stories():
    tone = request.form.get('tone', '')
    genre = request.form.get('genre', '')
    topic = request.form.get('topic', '')
    input_data = {
        "tone": tone,
        "genre": genre,
        "topic": topic
    }
    version = "0.1.0"
    flow_name = f"@shreyannarula1/story-outline-generator/{version}"
    
    try:
        result = client.flow.execute(flow_name, input_data)
        
        # Ensure exactly 5 plots are generated
        outlines = result.get("outlinestory", "").split("\n")
        plots = [plot.strip() for plot in outlines if plot.strip()]
        
        # If fewer than 5 plots, pad with placeholder plots
        while len(plots) < 5:
            plots.append(f"Plot {len(plots) + 1}: Additional plot option needed")
        
        # Truncate to exactly 5 plots if more than 5
        plots = plots[:5]
        
        return jsonify({
            "status": "success", 
            "plots": plots, 
            "tone": tone, 
            "genre": genre, 
            "topic": topic
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/improve_story', methods=['POST'])
def improve_story():
    plot = request.form.get('plot', '')
    tone = request.form.get('tone', '')
    genre = request.form.get('genre', '')
    topic = request.form.get('topic', '')
    twist = request.form.get('twist', '')

    input_data = {
        "plot": plot,
        "tone": tone,
        "genre": genre,
        "topic": topic,
        "twist": twist
    }

    version = "0.1.0"
    flow_name = f"@shreyannarula1/story-update-and-improvement-generator/{version}"
    
    try:
        result = client.flow.execute(flow_name, input_data)
        
        # Convert result to 5 sections if it's a single string
        if isinstance(result, str):
            sections = result.split('\n\n')[:5]
            result = {f"Section {i+1}": section for i, section in enumerate(sections)}
        
        return jsonify({
            "status": "success", 
            "improved_story": result
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)