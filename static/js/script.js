document.addEventListener('DOMContentLoaded', () => {
    const storyForm = document.getElementById('story-form');
    const generateBtn = document.getElementById('generate-btn');
    const loadingSection = document.getElementById('loading-section');
    const storyOutlinesSection = document.getElementById('story-outlines-section');
    const storyOutlinesContainer = document.getElementById('story-outlines-container');
    const finalStorySection = document.getElementById('final-story-section');
    const finalStoryContent = document.getElementById('final-story-content');
    const themeToggle = document.getElementById('theme-toggle');
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    const inputFields = document.querySelectorAll('#tone, #genre, #topic');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    suggestionItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.preventDefault();
            
            const suggestionText = item.querySelector('span').textContent;
            const inputType = item.dataset.type;
            
            e.dataTransfer = e.originalEvent?.dataTransfer || e.dataTransfer;
            e.dataTransfer.setData('text/plain', JSON.stringify({
                text: suggestionText,
                type: inputType
            }));

            item.classList.add('dragging');
        });

        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging');
        });
    });

    inputFields.forEach(field => {
        field.addEventListener('dragover', (e) => {
            e.preventDefault();
            field.classList.add('drag-over');
        });

        field.addEventListener('dragleave', (e) => {
            field.classList.remove('drag-over');
        });

        field.addEventListener('drop', (e) => {
            e.preventDefault();
            field.classList.remove('drag-over');

            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                
                if (field.dataset.type === data.type) {
                    field.value = data.text;
                } else {
                    alert(`Please drag ${data.type} suggestions to the correct field.`);
                }
            } catch (error) {
                console.error('Error processing drag and drop:', error);
            }
        });
    });

    storyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        generateBtn.disabled = true;
        loadingSection.style.display = 'block';
        storyOutlinesSection.style.display = 'none';
        finalStorySection.style.display = 'none';
        
        const tone = document.getElementById('tone').value;
        const genre = document.getElementById('genre').value;
        const topic = document.getElementById('topic').value;

        const formData = new FormData();
        formData.append('tone', tone);
        formData.append('genre', genre);
        formData.append('topic', topic);

        try {
            const response = await fetch('/generate_stories', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            loadingSection.style.display = 'none';
            generateBtn.disabled = false;

            if (data.status === 'success') {
                window.selectedTone = data.tone;
                window.selectedGenre = data.genre;
                window.selectedTopic = data.topic;

                storyOutlinesContainer.innerHTML = '';

                
                data.plots.forEach((plot, index) => {
                    const outlineElement = document.createElement('div');
                    outlineElement.classList.add('story-outline');
                    
                    outlineElement.innerHTML = `
                        <div class="outline-header">
                            <span class="outline-number">Plot ${index + 1}</span>
                            <i class="fas fa-scroll"></i>
                        </div>
                        <p class="outline-text">${plot}</p>
                        <div class="outline-actions">
                            <button class="select-outline-btn">
                                Select Plot <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    `;

                    const selectButton = outlineElement.querySelector('.select-outline-btn');
                    selectButton.addEventListener('click', () => generateFinalStory(plot));
                    
                    storyOutlinesContainer.appendChild(outlineElement);
                });

                storyOutlinesSection.style.display = 'grid';
                finalStorySection.style.display = 'none';
            } else {
                alert('Error generating stories: ' + data.message);
            }
        } catch (error) {
            loadingSection.style.display = 'none';
            generateBtn.disabled = false;

            console.error('Error:', error);
            alert('An error occurred while generating stories.');
        }
    });

    const createEditModal = () => {
        const modal = document.createElement('div');
        modal.id = 'story-edit-modal';
        modal.classList.add('modal');
        // Add style to ensure it's hidden by default
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Edit Your Story</h2>
                <textarea id="story-edit-textarea" rows="15"></textarea>
                <div class="modal-actions">
                    <button id="save-edit-btn" class="btn">Save Changes</button>
                    <button id="download-story-btn" class="btn">
                        Download Story 
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    };

    const editModal = createEditModal();
    const storyEditTextarea = document.getElementById('story-edit-textarea');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const downloadStoryBtn = document.getElementById('download-story-btn');
    const closeModalBtn = editModal.querySelector('.close-modal');

    // Function to open edit modal
    function openEditModal() {
        // Collect story text from all sections
        const storyText = Array.from(finalStoryContent.children)
            .map(section => {
                const sectionTitle = section.querySelector('h3').textContent;
                const sectionContent = section.querySelector('p').textContent;
                return `${sectionTitle}\n${sectionContent}\n\n`;
            })
            .join('');

        storyEditTextarea.value = storyText.trim();
        // Use display block to show modal
        editModal.style.display = 'flex';
    }

    function closeEditModal() {
        // Use display none to hide modal
        editModal.style.display = 'none';
    }

    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', closeEditModal);

    // Close modal when clicking outside the modal content
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    // Save edit functionality
    saveEditBtn.addEventListener('click', () => {
        // Update story sections with edited text
        const editedSections = storyEditTextarea.value.split('\n\n');
        finalStoryContent.innerHTML = '';

        editedSections.forEach((section, index) => {
            const lines = section.split('\n');
            const sectionTitle = lines[0] || `Section ${index + 1}`;
            const sectionContent = lines.slice(1).join(' ');

            const storyPart = document.createElement('div');
            storyPart.classList.add('story-section');
            storyPart.innerHTML = `
                <h3>${sectionTitle}</h3>
                <p>${sectionContent}</p>
            `;
            finalStoryContent.appendChild(storyPart);
        });

        closeEditModal();
    });
    // Download story functionality
    downloadStoryBtn.addEventListener('click', () => {
        const storyText = storyEditTextarea.value;
        const blob = new Blob([storyText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'StoryForge_Story.txt';
        link.click();
    });
    // Add edit button after story generation
    function addEditButton() {
        const editButton = document.createElement('button');
        editButton.classList.add('edit-story-btn');
        editButton.innerHTML = `
            Edit Story 
            <i class="fas fa-edit"></i>
        `;
        editButton.addEventListener('click', openEditModal);
        
        // Remove any existing edit buttons first
        const existingEditButtons = finalStorySection.querySelectorAll('.edit-story-btn');
        existingEditButtons.forEach(btn => btn.remove());
        
        finalStorySection.insertBefore(editButton, finalStoryContent);
    }

    async function generateFinalStory(selectedPlot) {
        loadingSection.style.display = 'block';
        storyOutlinesSection.style.display = 'none';
        finalStorySection.style.display = 'none';

        const formData = new FormData();
        formData.append('plot', selectedPlot);
        formData.append('tone', window.selectedTone);
        formData.append('genre', window.selectedGenre);
        formData.append('topic', window.selectedTopic);
        formData.append('twist', '');

        try {
            const response = await fetch('/improve_story', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            loadingSection.style.display = 'none';

            if (data.status === 'success') {
                finalStoryContent.innerHTML = '';
                
                // Handle both object and string responses
                if (typeof data.improved_story === 'object') {
                    // If it's an object with sections
                    Object.entries(data.improved_story).forEach(([key, value]) => {
                        const storyPart = document.createElement('div');
                        storyPart.classList.add('story-section');
                        storyPart.innerHTML = `
                            <h3>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                            <p>${value}</p>
                        `;
                        finalStoryContent.appendChild(storyPart);
                    });
                } else {
                    const sections = data.improved_story.split('\n\n').slice(0, 5);
                    sections.forEach((section, index) => {
                        const storyPart = document.createElement('div');
                        storyPart.classList.add('story-section');
                        storyPart.innerHTML = `
                            <h3>Section ${index + 1}</h3>
                            <p>${section}</p>
                        `;
                        finalStoryContent.appendChild(storyPart);
                    });
                }
                finalStorySection.style.display = 'block';
                addEditButton();
            } else {
                alert('Error improving story: ' + data.message);
            }
        } catch (error) {
            loadingSection.style.display = 'none';

            console.error('Error:', error);
            alert('An error occurred while improving the story.');
        }
    }
});