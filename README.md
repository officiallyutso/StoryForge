# StoryForge: AI-Powered Story Generation Platform

## Overview

StoryForge is an innovative web application that leverages AI to help writers generate compelling story outlines and develop creative narratives. By combining advanced language models with an intuitive user interface, StoryForge provides writers with a powerful tool to overcome writer's block and explore new storytelling possibilities.

## Features

- Interactive AI-powered story generation
- Customizable story elements
- Multiple genre and tone options
- Drag-and-drop suggestion interface
- Dark/light theme support
- Story editing and download capabilities

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **AI Integration**: Mira SDK
- **Libraries**: 
  - Font Awesome for icons
  - particles.js for background animation

## Prerequisites

- Python 3.8+
- pip
- Flask
- Mira SDK

## Demo Images

## StoryForge: Interactive Story Generation Platform Features

| Feature | Description | Screenshot |
|---------|-------------|------------|
| Story Generation Interface | An intuitive form where writers can input their desired story parameters. Users select or type in a specific tone (e.g., Mysterious), genre (e.g., Science Fiction), and topic (e.g., Time Travel). The drag-and-drop suggestions make it easy to explore creative combinations and overcome writer's block. | ![Story Generation Interface](https://github.com/user-attachments/assets/8b212b71-971e-4969-879b-d8d639a802a4) |
| Multiple Plot Generation | After submitting story parameters, the AI generates multiple unique plot outlines. Each plot is numbered and presented with a select button, allowing writers to explore different narrative possibilities. This feature helps writers find inspiration and choose a direction that resonates with their creative vision. | ![Plot Generation](https://github.com/user-attachments/assets/f236e270-1ef9-4776-860d-8b655414b3bd) |
| Story Expansion and Refinement | Once a plot is selected, the AI expands the outline into a more detailed story. The generated narrative is divided into sections, providing a structured and comprehensive storytelling experience. Each section offers a different aspect of the story, from character development to plot progression. | ![Generated Story](https://github.com/user-attachments/assets/3e2bc364-e2b4-4c4f-8f5f-76b2dcc91fac) |
| Story Editing and Download | A powerful editing feature allows writers to modify their generated story directly in the application. Users can edit story sections, rearrange content, and refine the narrative. The download functionality enables saving the story as a .txt file, making it easy to transfer the work to other writing platforms or continue editing offline. | ![Story Editing](https://github.com/user-attachments/assets/74355a99-46df-42a1-86fe-ea08ad3d77cd) |
| About Page | Provides a comprehensive overview of StoryForge, highlighting its innovative approach to AI-assisted storytelling. The page explains the platform's key features, technological foundations, and mission to empower writers through artificial intelligence. | ![About Page](https://github.com/user-attachments/assets/4c01f36a-38a8-4a87-9ca0-56c27ca4ccc2) |
| Contact Page | Offers users a direct communication channel with the StoryForge team. This page likely includes contact forms, email addresses, or additional information about support and collaboration opportunities. | ![Contact Page](https://github.com/user-attachments/assets/8e6bd4c5-4fb9-4c98-830f-1e2104d13814) |

## Key Technological Innovations

- **AI-Powered Story Generation**: Utilizes advanced language models to create unique, contextually relevant story outlines
- **Flexible Input Parameters**: Supports multiple tones, genres, and topics
- **Interactive User Interface**: Drag-and-drop suggestions and intuitive design
- **Responsive Design**: Works seamlessly across different devices and screen sizes
- **Theme Customization**: Dark and light mode options for user comfort


## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/storyforge.git
cd storyforge
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 3. Install Dependencies

```bash
pip install flask mira-sdk
```

### 4. Configure API Key

Replace the placeholder API key in `app.py`:
```python
client = MiraClient(config={"API_KEY": "your_mira_api_key"})
```

### 5. Run the Application

```bash
python app.py
```

## Project Structure (main)

```
storyforge/
│
├── app.py                 # Flask application
├── templates/
│   ├── index.html         # Main application interface
│   ├── about.html
│   └── contact.html
│
├── static/
│   ├── css/
│   │   ├── styles.css     # Main styling
│   │   └── menu.css       # Navigation styling
│   │
│   └── js/
│       ├── script.js      # Main application logic
│       ├── menu.js        # Menu interactions
│       └── particles.js   # Background particle animations
│
└── requirements.txt       # Project dependencies
```

## Key Components

### Backend (app.py)

The Flask application handles two primary routes:

1. `/generate_stories`: Generates multiple story outlines based on user-provided parameters
   - Inputs: Tone, Genre, Topic
   - Uses Mira SDK to execute story generation flow

2. `/improve_story`: Refines a selected story outline
   - Inputs: Plot, Tone, Genre, Topic
   - Generates more detailed story sections

### Frontend (script.js)

Manages user interactions:
- Theme toggling
- Drag-and-drop suggestions
- Story generation workflow
- Story editing and download functionality

### Particle Background (particles.js)

Creates an interactive particle animation with:
- Customizable particle count
- Interactive hover and click effects
- Responsive design

## User Workflow

1. Select or input story tone, genre, and topic
2. Generate story outlines
3. Choose a plot outline
4. Refine and generate full story
5. Edit and download the final story

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

UTSO SARKAR - utsosarkar1@gmail.com

Project Link: [https://github.com/yourusername/officiallyutso]
