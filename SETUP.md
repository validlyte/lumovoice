# LumoVoice — Complete Setup Guide for Beginners

Follow these steps in order. Each one is explained plainly — no experience needed.

---

## What you have right now

You downloaded these 6 files from Claude:
```
index.html       ← the entire app
sw.js            ← makes the app installable on your phone
manifest.json    ← tells your phone the app's name and icon
SETUP.md         ← this guide
icon-192.png     ← app icon (small)
icon-512.png     ← app icon (large)
```

---

## STEP 1 — Create a folder on your computer

1. On your Windows PC, open **File Explorer**
2. Go to your **Documents** folder
3. Right-click → **New → Folder**
4. Name it `LumoVoice`
5. Move all 6 files into that folder

Your folder should look like this:
```
📁 LumoVoice
   ├── index.html
   ├── sw.js
   ├── manifest.json
   ├── SETUP.md
   ├── icon-192.png
   └── icon-512.png
```

---

## STEP 2 — Upgrade Firebase to Blaze plan (free in practice)

Firebase Storage (where your PDFs will live) requires a credit card on file,
but you will NOT be charged for normal personal use.

1. Go to **https://console.firebase.google.com**
2. Click your **lumovoice** project
3. At the bottom-left, click **"Upgrade"** (next to "Spark plan")
4. Choose **Blaze (pay as you go)** → click **Continue**
5. Enter your credit card → **Purchase**
6. Immediately after: click the ⚙️ **Settings** → **Usage and billing** → **Alerts**
7. Set a budget alert for **$1** so you get an email if anything unexpected happens

> You will not be charged. The free limits are enormous for personal use.
> 5 GB storage and 1 GB/day downloads — a PDF app for one person uses almost nothing.

---

## STEP 3 — Enable Storage in Firebase

1. In Firebase Console, click **Databases & Storage** in the left sidebar
2. Click **Storage** → **Get started**
3. Choose **Start in test mode** → **Next** → **Done**

Now click the **Rules** tab and replace whatever is there with:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
Click **Publish**.

Then do the same for **Firestore** rules:
1. Click **Firestore** in the left sidebar
2. Click the **Rules** tab
3. Replace the contents with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
Click **Publish**.

---

## STEP 4 — Install Node.js on your Windows PC

Node.js is free software that lets you run the deployment tool.

1. Go to **https://nodejs.org**
2. Click the big **"LTS"** download button (the recommended version)
3. Open the downloaded file and click **Next** through every screen
4. When it finishes, click **Finish**

To check it worked:
1. Press **Windows key + R** on your keyboard
2. Type `cmd` and press **Enter** — a black window opens
3. Type `node --version` and press **Enter**
4. You should see something like `v20.11.0` — that means it worked ✅

---

## STEP 5 — Install the Firebase tool

In that same black Command Prompt window, type this and press **Enter**:

```
npm install -g firebase-tools
```

Wait for it to finish (about 1 minute). Lots of text will scroll by — that's normal.

---

## STEP 6 — Log in to Firebase

In the Command Prompt, type:

```
firebase login
```

Press **Enter**. A browser window opens asking you to log in with Google.
Log in with the same Google account you used to create the Firebase project.
Come back to the Command Prompt when done — it should say **"Success! Logged in as..."**

---

## STEP 7 — Navigate to your LumoVoice folder

In the Command Prompt, type this exactly and press **Enter**:

```
cd %USERPROFILE%\Documents\LumoVoice
```

The prompt will now show your LumoVoice folder path. You're in the right place.

---

## STEP 8 — Set up Firebase Hosting

Type this and press **Enter**:

```
firebase init hosting
```

It will ask you several questions. Answer them exactly like this:

| Question | Your answer |
|---|---|
| Which project? | Use arrow keys to select **lumovoice-2ddc4** → press Enter |
| What do you want as your public directory? | Type `.` (just a single period) → Enter |
| Configure as a single-page app? | Type `y` → Enter |
| Set up automatic builds with GitHub? | Type `n` → Enter |
| File ./index.html already exists. Overwrite? | Type `n` → Enter ← important! |

---

## STEP 9 — Deploy!

Type this and press **Enter**:

```
firebase deploy
```

Wait about 30 seconds. When done you'll see:

```
✔  Deploy complete!
Hosting URL: https://lumovoice-2ddc4.web.app
```

That URL is your live app — open it on any device!

---

## STEP 10 — Install on your iPhone

1. On your iPhone, open **Safari** (must be Safari, not Chrome)
2. Go to **https://lumovoice-2ddc4.web.app**
3. Tap the **Share button** (box with arrow at the bottom of the screen)
4. Scroll down and tap **"Add to Home Screen"**
5. Tap **Add** in the top right
6. LumoVoice now appears on your home screen like a real app ✅

---

## STEP 11 — Install on Windows PC

1. Open **Google Chrome** on your PC
2. Go to **https://lumovoice-2ddc4.web.app**
3. Look for a small install icon in the address bar (looks like ⊕ or a monitor with a down arrow)
4. Click it → click **Install**
5. LumoVoice opens as its own window, separate from Chrome ✅

---

## How to use it

**Uploading a PDF**
Open LumoVoice on your PC → drag any PDF onto the upload area, or click "Add Tome".
It uploads to Firebase and appears on your iPhone automatically.

**Listening with Text-to-Speech**
Open any PDF → tap the 🔊 Listen tab → press ▶
Your device reads it aloud. Adjust speed with the Pace slider.

**Recording your own voice**
Open a PDF → tap 🎙 Record Voice → press Start Recording → read aloud → Stop.
Your recording saves to the cloud and plays back on any of your devices.

---

## Troubleshooting

**PDFs won't upload** → Make sure Step 2 (Blaze plan) and Step 3 (Storage) are done.

**"Permission denied" errors** → Redo the Rules sections in Step 3.

**TTS doesn't work on iPhone** → Must use Safari. Also check your phone isn't on silent.

**Can't find install icon on Chrome** → Make sure you're on the exact `.web.app` URL.

---

## Updating the app in the future

If you ever receive a new `index.html` from Claude:
1. Replace the file in your LumoVoice folder
2. Open Command Prompt, run `cd %USERPROFILE%\Documents\LumoVoice`
3. Run `firebase deploy`
Done — the update is live on all your devices instantly.
