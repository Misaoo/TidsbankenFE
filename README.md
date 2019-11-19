# Tidsbanken frontend


## Plan

### Endpoints/views


| Endpoint           | Description   |
| ------------------ | ------------- |
| /                  | Content Cell  |
| /login             | Content Cell  |
| /2fa               | Content Cell  |
| /dashboard         | Content Cell  |
| /user/:id          | Content Cell  |
| /user/:id/history  | Content Cell  |
| /admin             | Content Cell  |



### Components per endpoint/view
| Component     | View           | Description |
| ------------- | -------------- | ----------- |
| Header        | All views      | Header contains links. If logged in: User profile, Logout button, Dashboard, notification dropdown list. If logged in and admin: logged in content + Admin area.  |
| Footer        | All views      | Containts copyright information, or links or both. |
| Calendar      | /dashboard     | The main calendar with overview and links to all request. |
| Modal | Any view | Displays child components as content |
| CreateVacationRequest | /dashboard | Shows form to create vacation request. |
| CreateIneligiblePeriod | /dashboard | Modal to create a new ineligble period. |
| LoginForm     | /login         | Contains loginform. |
| UserProfile   | /user/:id      | Lists users information.  |
| ChangeUserProfile | /user/:id | Changes users information. |
| CreateUserForm    | /admin      | Form to create a user, including if admin or not. |
| UpdateUserForm     | /admin      | Form to update user info, including if admin or not. |
| UserList | /admin | Lists all users. |
| VacationSettings | /admin | Settings for max period of vacation days. |
| ImportExportData | /admin | Component for importing / exporting data as JSON. |
|2FAForm| /2fa | Component for sending 2fa |


### Some Views and Components structure

#### Views
    - Login
    - Dashboard
    - Requests (If allowed to deviate from requirements, then maybe not)
    - User
    - Admin


#### Components
    - Common
        - Header
        - Footer
        - Modal
    - Calendar
        - Calendar
        - ...
    - Requests
        - CreateVacationRequest
    - Admin
        - CreateIneligiblePeriod
        - UserList
        - VacationSettings
        - Data
            - Import
            - Export
    - User
        - UserProfile
    - Auth
        - LoginForm
        - Logout
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
