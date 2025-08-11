# AA-clocked-in
This project is a simple Express server that serves static HTML pages, uses jQuery for AJAX and DOM manipulation, and demonstrates modular UI components (like a shared navigation bar).  
You can easily add new pages to the app, and reuse shared code/components across all pages.

---

## Table of Contents

- [Running the Application](#running-the-application)
- [Project Structure](#project-structure-example)
- [How Pages Work](#how-pages-work)
- [Adding a New Page](#adding-a-new-page)
- [Using the Shared Navigation Bar](#using-the-shared-navigation-bar)
- [Reusing Common JS Logic](#reusing-common-js-logic)
- [Styling Your Page](#styling-your-page)
- [Serving New Pages](#serving-new-pages)
- [Troubleshooting](#troubleshooting)
- [Example: Add a "About" Page](#example-add-a-about-page)
- [Branching, Committing, Pushing, and Merging](#branching-committing-pushing-and-merging)
- [Creating a Pull Request via GitHub](#creating-a-pull-request-via-github)

---

## Running the Application

Follow these steps to get the web app running locally on your machine.

---

### 1. Install Node.js

If you do not already have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

- Recommended version: **18.x or newer**
- You can check your Node.js version by running:
  ```bash
  node -v
  ```

---

### 2. Clone the Repository

```bash
git clone https://github.com/Littlewoko/AA-clocked-in.git
cd your-repo-name
```

---

### 3. Install Dependencies

Install the required npm packages for your project:

```bash
npm install
```

This will install Express and any other dependencies listed in your `package.json`.

---

### 4. Set Up Environment Variables

If your app uses environment variables (e.g., API keys), create a `.env` file in the project root.  
For example:

```
API_KEY=your_super_secret_api_key
```

---

### 5. Start the Server

Run the Express server with:

```bash
npm run dev
```

You should see output like:

```
App running on port: 3000
Open in browser: http://localhost:3000
```

---

### 6. Open in Browser

Visit [http://localhost:3000](http://localhost:3000) to see your app.  
You can navigate to different pages (e.g., `/index.html`, `/pokemon-fetcher.html`, `/about.html`) using the links bar.

---

When you edit code, changes will appear right away after refreshing the browser.
If the server stops due to an error (watch for messages in your terminal), press Ctrl + C to exit.
Once you’ve fixed the code, restart the server by running npm run dev.

## Project Structure Example

```
your-app/
├── public/
│   ├── components/
│   │   └── navbar.html         # Shared navigation bar HTML component
│   ├── communication-example.html
│   ├── index.html
│   ├── about.html              # (example new page)
│   ├── style.css               # Shared styles
│   └── common.js               # Shared JS logic for all pages
├── index.js                    # Express server
├── package.json
├── .env                        # API keys, environment variables
```

---

## How Pages Work

- Each HTML file in `public/` is served as a static page by Express.
- Shared UI (like the navigation bar) is kept in `public/components/links-bar.html`.
- Common JS (`common.js`) loads shared components and logic automatically on every page.
- jQuery is loaded via CDN for DOM and AJAX functionality.

---

## Adding a New Page

1. **Create a New HTML File**

   - Place it in the `public/` directory.
   - Give it a descriptive name (e.g., `about.html`, `my-feature.html`).

2. **Include Required Script Tags**

   At the end of your HTML file, before `</body>`, add:
   ```html
   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
   <script src="common.js"></script>
   ```

3. **Add the Navigation Bar Placeholder**

   Add this at the top of your `<body>`:
   ```html
   <div id="navBar"></div>
   ```

4. **Write Your Page Content**

   Below the navigation bar, add your page-specific HTML.

5. **(Optional) Add Page-Specific Styles**

   - Use `style.css` for shared styles.
   - For page-specific styles, use a `<style>` block in your HTML or add a new CSS file.

---

## Using the Shared Navigation Bar

The navigation bar is defined in `public/components/links-bar.html`:

```html
<nav class="links-bar">
    <a href="index.html">Home</a>
    <a href="communication-example.html">Pokemon Fetcher</a>
    <!-- Add more links here for new pages -->
    <a href="about.html">About</a>
</nav>
```

**To ensure it's loaded on every page:**

- Add `<div id="linksBar"></div>` in the HTML.
- `common.js` will automatically inject the nav bar into this div using jQuery’s `.load()`.

---

## Reusing Common JS Logic

Any jQuery code you want to run on every page (e.g. loading the nav, global handlers) goes in `public/common.js`:

```javascript
$(function() {
    // Load the links bar component into #linksBar
    $("#linksBar").load("components/links-bar.html");
    // Add more shared logic here
});
```

**You do NOT need to copy this code into each page.  
Just include `<script src="common.js"></script>` in your HTML.**

---

## Styling Your Page

- Add shared styles to `public/style.css`.
- Reference it in your HTML `<head>`:
  ```html
  <link rel="stylesheet" href="style.css">
  ```
- For custom styles, add a `<style>` block in your HTML or a new CSS file.

---

## Serving New Pages

- Express automatically serves any file placed in `public/`.
- Access your new page at `http://localhost:3000/about.html` (or whatever filename you chose).

---

## Troubleshooting

- **Navigation bar not showing?**
  - Make sure `<div id="linksBar"></div>` is present.
  - Check that `common.js` is included, and that the path is correct.
  - Ensure your Express app uses `express.static('public')`.

- **jQuery not working?**
  - Confirm the CDN link and `common.js` are loaded after jQuery.

- **Links bar missing new page?**
  - Edit `components/links-bar.html` and add a link to your new page.

---

## Example: Add a "About" Page

1. **Create `public/about.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>About This App</title>
       <link rel="stylesheet" href="style.css">
   </head>
   <body>
       <div id="linksBar"></div>
       <h1>About This App</h1>
       <p>This web app demonstrates Express, HTML, jQuery, and modular UI components.</p>
       <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
       <script src="common.js"></script>
   </body>
   </html>
   ```

2. **Edit `public/components/links-bar.html` and add:**
   ```html
   <a href="about.html">About</a>
   ```

3. **Visit `http://localhost:3000/about.html` in your browser.**

---

## Summary

- Create a new HTML file in `public/`
- Add `<div id="linksBar"></div>`
- Include jQuery and `common.js`
- Add a link to your page in `components/links-bar.html`
- Write your page content

---

## Branching, Committing, Pushing, and Merging

### Branching

To make changes or add new features/pages, create a new branch:

```bash
git checkout main
git pull
git checkout -b your-feature-branch
```
Replace `your-feature-branch` with a descriptive name (e.g., `add-about-page`).

### Committing

After you’ve made changes, stage and commit them:

```bash
git add .
git commit -m "Describe your changes here"
```

### Pushing

Push your branch to GitHub:

```bash
git push origin your-feature-branch
```

### Merging to Main

After your changes are reviewed and approved, merge your branch into `main`:

1. Checkout `main`:
   ```bash
   git checkout main
   ```
2. Pull latest changes:
   ```bash
   git pull
   ```
3. Go back to your branch:
   ```bash
   git checkout -
   ```
4. Merge main:
   ```bash
   git merge main
   ```
5. Resolve conflicts if necessary (in VSCode or other IDE, don't use the terminal)
6. Push to github
  ```bash
   git push
   ```

---

## Creating a Pull Request via GitHub

1. **Push your branch to GitHub** (see above).
2. Go to your repository on [GitHub](https://github.com).
3. You’ll see a prompt to create a pull request for your recently pushed branch.  
   Or, click "Pull requests" > "New pull request".
4. Select your branch as the "compare" branch and `main` as the "base".
5. Fill in the pull request title and description, then click "Create pull request".
6. After review, the pull request can be merged via the GitHub UI.

---

**Enjoy building new pages for your web app!**
