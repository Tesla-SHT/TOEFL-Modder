# TOEFL-Modder

### Background

Mr. Cai, a student at Westlake University, is facing the TOEFL exam and feeling overwhelmed by the lack of effective English learning resources. Existing resources are limited, filled with advertisements, and lack a comprehensive approach. As his friends, we want to create an interactive English learning software that is tailored to Westlake University students, helping them improve their English skills anytime, anywhere. Our goal is to support Mr. Cai and other students in conquering the challenges of the TOEFL exam while uncovering its true nature.

### Software Design 
TOEFL-Modder is built using the most popular PC software development technologies and frameworks:
- Electron: A framework that allows developers to build cross-platform desktop applications
- Vue: A progressive JavaScript framework that simplifies the development of user interfaces
- Vite: A build tool for web applications that offers fast development and optimized production builds
- Naive UI: A Vue-based UI library that provides a set of customizable components for building desktop applications
- SQLite: A lightweight, serverless, self-contained, and embeddable database engine

### Requirements
1. Setup
   - Download Nodejs
   - Open cmd under the root folder
   - npm install (if too slow, input "npm install -g cnpm --registry=https://registry.npm.taobao.org" and "cnpm install")
   - Click QuickStart.bat under the root folder
   - 

   - Or you can just try QuickSetup.bat, but you may need to try again for the evitable error.
2. Daily Use

   Just Click **QuickStart.bat**!
   
### Description
1. Books: 
   This is the central page of our software, in which users could select the vocabulary books that they want to learn by clicking the "+" button in the lower right place of the page. Here we already have four vocabulary books all set. And the user could input the books that they wish to work on. Till now, only csv. files are allowed to be imported with words on column one, explanations on column two and example sentences on column three. 
   
   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/c21dcea2-adfb-428a-8d69-9c9545af3301" alt = "Books" width="50%">
   
   And the click action on each book would direct to the reciting page of each vocabulary. In which users would select the explanation of the word and get a response. Also, there were two more functions including adding the word into the user's collection list (which could be further accessed on the Progress page) and removing the word from the whole book.
   
   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/a9523f50-4549-4069-a6a4-790c2cc0c51f" alt = "Recite" width="45%" >
   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/fc24784d-66a2-4bbc-ad82-9627aa28211c" alt = "Recite" width="45%">

2. Progress: Display the learning data and some analysis:
   
   Here you could see the progress that you made after you met our software, including the days you spent on each book, your accuracy in selecting the explanation of the word, and continuous study. And also, the word number that you recite each day.

   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/fe099637-a86f-44af-984a-21d7089d93e6" alt = "Progress" width="50%">

   Collection button will direct to the collected word list. And in that page you can find the words in your collection list, and there also have one subsection of the page for you to review.

   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/139da18b-b911-44eb-a3b0-0c558e61c369" alt = "Collection" width="45%" >
   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/b6773d54-5f4b-4651-ba72-b3d649101e37" alt = "Collection" width="45%">

3. Setting: Divided into two parts: Study and General

   In study section, you could personalize your choice of how many words you want to recite or review. Also, the pronunciation mode, word order and the study order of words could be selected.

   In general display section, you could change the display scale and choose the background display mode. Also, the progress data could be cleared out if the user wishes to start again.
   
   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/c2f61d95-5411-427a-8216-ce5bf70f74c2" alt = "Seting" width="50%">

5. About: Basic information about our software

   <img src = "https://github.com/Tesla-SHT/TOEFL-Modder/assets/109467147/9a8d01e1-7b3d-4efd-a3b0-f1522ef61d3c" alt = "About" width="50%">


### Weekly Journal
For better inter-group communication, we created one notion page for recording the weekly progress. Since different people are in charge of different parts of the work, the potential blocks and bugs of the program are also recorded for more efficient debugging. And also, this notion page enabled us to check each person's contribution to the project.
Check this page out by the link below:
[Link to our journal in Notion](https://www.notion.so/77f99992c04b4985bba37d818bcd17b7?v=5ca4aee77cf440c0b3d5acf09f4c8a8a)

### Tips
1. How can users upload their own dictionaries?

   First, the user should scratch a dictionary from the Internet and transform it to a csv file.

   Second, the first row of the file should be Words, Definitions, Examples, and corresponding data should be list in three columns.

   Finally, click “+” at the lower right of the books page and choose it!

2. What is our future plan for the database?

   We can let users to sign up various accounts, and each account will have a  set of json settings. So the database will manage these and overwrite the using json files with the specified user’s files. 

3. Any comment or advice? Feel free to contact us!
