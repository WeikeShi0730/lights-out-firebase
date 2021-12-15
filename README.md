# Getting Started with F1 Lights out app

This project was developed with create-react-app and firebase.

## How to play



### Sign up & Sign in

You will be asked to sign up first if you do not have an account, and you need to sign in if you already have an account. This step is completed with Firebase authentication functions. No time will be recorded if you are not signed in.

### Leaderboard

You will see a leaderboard to the right or bottom of the screen (depending on your screen size). This section would display all players' records, and show where you stand among all players. Records are stored using Firebase Firestore.

### Play!

Click once on the lights, 5 lights will start to light up one by one. When all of the lights are on, some random timer is introduced to delay before the lights go out. You will need to click the second time as fast as you can when you see the lights go out. A timer will record your reaction time.

Click again to reset the timer.

If you click too fast before the lights go out, that's a jump start, no time will be recorded and you have to start again.

Focus, and try to click as fast as you can! Personal best will be set and that will update your standings on the leaderboard.

FYI, the average human reaction time is around 250ms, and professional F1 drivers are trained to be crazily fast at this.

### Sign out, delete record or account

You can sign out, delete your timer record or account entirely by clicking on your name on the top-left corner.