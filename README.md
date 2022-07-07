PROJECT SETUP
###########
HIERCHY
1. FLOW : PAGES => LAYOUT(MAIN) => MAIN => COMPONENTS

NOTE: 
1. PAGES: Should only contain SEO fields provided into Layout.
2. LAYOUT: Layout support HEAD tag and is important to handle SEO of application. Layout shall receive all HEAD tah attributes dynamically from PAGES.
3. MAIN: Direct successor to pages folder. Will contain files named similar to pages I.e. home.js (pages) => home.main.jsx (mains)
4. COMPONENTS: Contains all components of the Application I.e. Buttons, Header, Footer etc.


AUTH SETUP:
1. Handled in contexts folder.
2. Contexts folder contains auth context that shall handle all auth logics and should return user with => useAuth hook.
3. User is accessible throughout application from context
4. To use user import useAuth hook and use it. I.e. const auth = useAuth() => user = auth.user.


CONTEXTS:
1. All wrappers or HOF Wrappers should be handled inside Context.
2. Context shall return a calculates value with a hook.


STYLING:
1. Project works on SCSS. (NO CSS SHOULD BE USED ANYWHERE).
2. STYLES folder available in root contains all scss files.
3. STYLES FOLDER structure shall be similar to App architecture. I.e. Same folder shall be available inside it but shall contain scss file.
3. NEXT JS supports two type of SCSS files.
    1. GLOBAL.scss : Can be imported only inside _app.js. 
        => USAGE: className='containers'
        => WORKS LIKE TRADITIONAL SCSS

    2. FILE.module.scss : Can be used in files.  
        => USAGE: classname={styles.file} 
        => NOTE: NEED IMPORTING I.e. import styles from '../styles/FILE.module.scss


LIBRARY INSTALLATION FLOW:
1. Permission shall be applicable for installation of any third party library.
2. No unused library shall be present inside package.json file.
3. Proper R&D should be done before using any library with following in mind => (WEEKLY DOWNLOADS, SUPPORT, ACTIVE ISSUES, ACTIVE PRs).


STATE MANAGEMENT:
1. REDUX SHOULD BE USED FOR STATE MANAGEMNT
2. REDUX HAS BEEN SETUP WITH REDUX-THUNK, REDUX-PROMISE to support PROMISE HANDLING.
3. Point 2 is important so as to minimize api calls inside components directly.
4. As much as possible API calls shall take place inside actions of REDUX made smart object using REDUX-THUNK AND PROMISE MIDDLEWARES.


COMMIT FLOW:
1. NO Warning or Error shall be seen on console of browser.
2. RUN 'npm run lint' to check and fix lint error and warnings.
3. RUN npm run build command to check issues before trying to commit to GIthub.
4. Push to Github


PROJECT START FLOW
1. Run 'npm install' followed by 'npm run dev' command.
