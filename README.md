# Vaalikone

Vaalikone is a joke web application made for April Fools 2019, just before the Finnish parliamentary elections of 2019.

## How to run Vaalikone locally

* Clone the repository
* Use node version <b>10</b> and then `npm install`
* Run `npm start`
* You can now visit your local Vaalikone at http://localhost:3000

## Code standards

Vaalikone follows strict code quality standards. This includes fully functional immutable programming and TypeScript. No mutation is allowed.

* No mutation!
* Functional programming
* TypeScript
* Do not exceed 100 characters per line
* Try to avoid types like "any" or "array" or "object". Those are vague and are not really better than no type
* Function names should tell what the function does to a programmer, not a computer. This means the function names should be as clear and descriptive as possible
* Use stateful functional components (with hooks and effects) instead of class-based stateful components

## Modules

We use the following modules:

* React Router
* Sass
* Redux
* React
* TypeScript

## Testing your code

Testing locally is required before creating a merge request. <br />
Testing of React Components is done using Enzyme, while testing of functions and code in general is done using Jest Unit Tests. Website functional testing should be done using Selenium.<br />

Run your tests by running `npm run test`

## Building and deploying your code

To build your code, run `npm run build`. This will create bundled files in `./build/`. <b>Remember to use node version 10 to build</b>

We have used Firebase to deploy our code. You can select something different, but if you want to use Firebase, here is how you do it:

* Set up things in Firebase console for deployment
* In Vaalikone, run `./node_modules/.bin/firebase login`, or if you have a global copy of Firebase, just run `firebase login`. Log in to your Firebase account.
* Run `./node_modules/.bin/firebase deploy` or `firebase deploy`
* You have now deployed successfully.

If you merge code using pull requests, the CI pipeline using Travis will also deploy automatically to Firebase.

## CI and merging in your code

To merge your code in, <b>do not push to master</b>.<br />
Instead, use the CI pipeline we have set up using Travis.<br />

* Create a new branch locally with your commits in it
* Push using -f to remote branch, like `git push origin someX -f`
* From the main page of Vaalikone, create a pull request to merge from your branch to master
* Ask for review from other collaborators
* Wait for Travis pipeline to finish and to deploy
* All MUST be green before merging
* Merge in your code

## Collaborators

* Jere Tapaninen (JereTapaninen)
* Roope Tapaninen (roope-t)
