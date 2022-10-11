
# SEI Project 3: Earth BnB 🏡

So, this was project 3 of the General Assembly SEI course and the second group project we embarked upon as a cohort. The challenge set was to make a full stack web application in 7 days utilising our new knowledge in backend development. For this project, we chose to build an Air BnB  style web site where users could view properties from around the world to help them choose destinations for their next holiday.



## Demo

https://project3-earthbnb.netlify.app


## Timeframe & Working Team

This project was a group project. We had 7 days to plan, execute and deploy.
My partners were Arianna Giordano and Flora Stocks. 

## Tech Stack

**Frontend:** 
- JavaScript (ES6)
- HTML
- CSS
- SASS
- React
- React-bootstrap
- MUI
- cloudinary-React

**Backend:**
- MongoDB
- Express
- Node

**Packages:**

- nodemon
- JsonWebToken
- bcrypt,
- dotenv
- axios

**Dev Tools:** 
- VS Code
- Google Fonts
- Google Dev Tools
- Insomnia
- Excalidraw
- GitHub







## Project Brief

Project #3:
​

​
- Build a full-stack application - by making your own backend and your own front-end.
- Use an Express API to serve your data from the Mongo database.
- Consume your API with a separate front-end built with React.
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Have a visually impressive design.
- Be deployed online so it's publicly accessible.



## Planning

After we had decided on the theme for our project, our planning started with a wireframe drawn out collaboratively using (our favourite) collaborative design tool, Excalidraw. A link to the full plan can be found here:
[![Excalidraw](https://res.cloudinary.com/dqcowm72f/image/upload/c_scale,w_102/v1665425227/Readme%20projects/0aee6643aa17c85443cc919f4b293e0986_pvbefd.png)](https://excalidraw.com/#room=81ec26a973c0b07b307e,xR-XsupOnF0AeFKzrE-AHA) 
In the excalidraw, we decided which features we wanted, which of these would be must haves and which would be stretch goals.
We then added these to our trello board to keep track of the project items:
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665435012/Readme%20projects/Screenshot_2022-10-10_at_21.50.05_yvdpep.png)

We started each day with a mini standup to ensure alignment between us and brief each other on any issues we were experiencing. We stayed on zoom throughout the workday and would help eachother out on any issues that required collaborative problem solving. At the end of each day we would have a debrief. Go over any key learnings for the day and make sure our git repos had been pushed and merged. These small things helped us to stay on track and work well together without too many merge conflicts.

From our planning, we also decided on how we wanted to divide up the project and work on particular aspects individually. We also decided that each of us  would work on both frontend and backend code to give us each experience on having worked on both  for the project.  Flora chose to work on the frontend setup, styling and seeding data required for the database and the filtering feature required for the all-properties page. Ariana chose to work on backend routes, authorisation, user controller, review controller and the respective frontends for these. I took on the tasks for backend endpoint testing, mongoose schemas, register/login, utils, error handling, properties controller, frontend uploading images, add-property and deleting properties. 

## Build/Code Process

### Backend

PropertyController:

Before being able to start in earnest on the frontend, we needed to set up the backend endpoints and make sure it would be able to handle the requests coming in from the client side. I was responsible for the property controller which would handle requests to add, remove, delete, get all properties and get individual ones. As an example here’s the code snippet for ‘update’ a property:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665435451/Readme%20projects/carbon_14_bxxqey.png)

The update function in the property controller first finds the document in the database using the mongoose method findById (in order to find the Id in the database). This is stored to the variable documentToUpdate.
If the document can’t be found in the db we return with the response:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665435847/Readme%20projects/carbon_15_m6c90u.png)

In order to prevent unregistered or unauthorised users from making changes to properties the next conditional logic checks if the request is coming from an admin or the user that created the document.  If the document’s creator is not the same as the current user making the request and if the role of the user is not admin then respond with the message below:
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665436007/Readme%20projects/carbon_16_ckjir0.png)

Otherwise we return the updatedDocument from the database once updated:
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665436516/Readme%20projects/carbon_17_bwhieb.png)

#### Mongoose Schemas

Each MongoDB document requires a schema to be accepted as a valid document in the database. Here is what our property schema looks like:
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665436671/Readme%20projects/carbon_18_ph3iqh.png)
The structure for each property document in the database look like the above and the models are important for ensuring that the data entering the database has a pre-defined structure. The Schema objects allow you to state which data is mandatory for acceptance into the database (i.e. required: true). This way you can ensure that users must include certain data for their submission and cannot submit, for example, a property without a name.

### Frontend

After completing the testing for our endpoints, I could then join in on working on the front end components of the project. For this, I focussed on the add property page and uploading images component.  

Add property page:

The add property page is essentially a form which allows users to add information about the property they are submitting to the website. For this I created the following JSX:
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665436940/Readme%20projects/carbon_19_vgcpvs.png)

This form is sent to the backend via the onSubmit function which is a post request to add the data to the database:
![AppScreenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665437048/Readme%20projects/carbon_20_tpvpl5.png)

#### Uploading user images

During our planning we decided that we wanted to allow users to add images to the site. Talking to our tutors at GA, we decided the best route for us to go down was utilising cloudinary to handle our upload and host images. This led me to then create an Uplaoding.js component to our frontend:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665437169/Readme%20projects/carbon_21_kriauu.png)

The JSX portion of this renders a file input button on the page, and when an image file is selected by the user the UploadImage function is called. This essentially makes a post request to cloudinary’s API appending the files to the cloud folder “erm5g0re” which is the repository created for the web app. Cloudinary returns the json object which is the image URL for the uploaded image and this data is spread into the data object that’s sent to our backend. 
## Screenshots
#### All properties page:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665437433/Readme%20projects/Screenshot_2022-10-10_at_22.29.38_cee8zw.png)

#### Add Property page:

![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665437503/Readme%20projects/Screenshot_2022-10-10_at_22.31.38_jhdshe.png)

#### Upload image (with image preview):
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665437570/Readme%20projects/Screenshot_2022-10-10_at_22.32.42_jmhczz.png)
## Challenges
One of the biggest challenges for me was how to allow a user to add a property image and how to let the user preview the image being uploaded. The cloudinary documentation isn’t the most clear when it comes to adding the data from a react front end but I managed to find some help on stack overflow on how to setup file uploads which led me to taking a relatively simple path utilising simple in built jsx input type ‘file’. 
Once the file had been uploaded, I found it difficult working out how to pass this information into the parent component making the endpoint request. 
Then, after a quick chat with the GA tutors I was reminded of the very fundamental and basic use of props! It was then clear how to pass make this change to the parent component.

Once data was set by the Uploading function is was then simple to render this preview to the page.


## Wins

I really enjoyed working with Flora and Arianna on this project. I think the styling is spot on and I like the way the project feels. 
Personally, I feel like a big win is having a much better understanding on how data flows from client to server and back again.

Creating this excalidraw at the beginning really helped us understand how this all linked together for our project:
![App Screenshot](https://res.cloudinary.com/dqcowm72f/image/upload/v1665437837/Readme%20projects/Screenshot_2022-10-10_at_22.37.11_ykpuye.png)
## Lessons Learned
One of the biggest takeaways for this project was the importance of good planning and project management. Our clear but basic trello board helped us keep track of tasks to be completed and where each member of the team was up to on the project. Even though we spent most of the time working solo we checked in with each other regularly.
This project was the first where we used Git collaboratively and it took us some time to get our heads around it. Creating our own branches and merging a great way of working, giving us the means to work independently on our own features whilst maintaining a fully working main. Any issues with our own code could then be worked on without affecting eachothers. Working on merge conflicts was a rare occurrence but one that we could work through via a screen share to make sure we were aligned on any resolutions made. 


## Bugs

No known bugs.
## Future Improvements

- Embed Cloudinary’s widget to allow users to edit and upload multiple images at a time
- Create a Google maps component on our single properties page
- Create a bookings/calander feature

