# Insta Video Controller

A Chrome extension for controlling Instagram videos with enhanced playback features.

## Features

- Video playback controls
- Custom styling for better user experience

## Installation

1. Clone this repository or download the files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked" and select this project folder
5. The extension will now appear in your Chrome extensions menu

## Project Structure

```
insta-video-controller/
├── icons/
│   ├── icon.png
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── .gitignore
├── content.js
├── manifest.json
└── README.md
```

- `manifest.json` - Extension configuration and permissions
- `content.js` - Main extension logic
- `style.css` - Extension styling
- `icons/` - Extension icons (16x16, 48x48, 128x128 PNG files)

## Screenshots

![Screenshot](images/gif-050103.gif)
![Screenshot 1](images/Screenshot%20044657.png)
![Screenshot 2](images/Screenshot%20044709.png)
![Screenshot 3](images/Screenshot%20044718.png)
![Screenshot 4](images/Screenshot%20044910.png)
![Screenshot 5](images/Screenshot%20044922.png)

## Usage

The extension will automatically activate on Instagram. Use the controls to manage video playback.

## Development

To make changes:
1. Edit the relevant files (content.js, style.css, etc.)
2. Go to `chrome://extensions/`
3. Click the reload icon on the extension card

## License

MIT
