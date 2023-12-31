## How might I create this app.

### Step 1

- I've imported ChakraUI and configured an auto-responsive grid using simple grid, whenvever a timer box is added to the page, it'll be added to the grid, and the grid will adjust based on how many boxes (up to 3 can be added) are on the screen.

### Step 2

I'll need to implement a logic to add new timers (up until 3). I'll need to use Chakra-UI to add an "Add Timer" button that on press, renders a modal component. The modal component will will have various inputs. Possible inputs will include: time (hrs - min 0 max 24, mins - min 0 max 59, sec - min 0 max 59), tournament type (dropdown for all the games), and title of the timer.

### Step 3

Once the user input has been collected, we can create a JSON object and set it to state. And on the base or homescreen, we'll have a map that renders a timer component for each object in the array. The various data input in the object will be used for props within the timer components.

### Step 4

I'll need to create a component with a number of functions inside of it. So this step needs to be broken down into parts:

#### Timer

The timer function will consume the time object, and set hours to state, minutes to state, and seconds to state. A setInterval inside the timer function will be called every 1 seconds(1000ms). When 1 second elapses:

- Decrement seconds state by 1.
  - If (seconds == 0 && minutes != 0) {setSeconds(59) and setMinutes(decrementedMinutes)} In this case, decrementedMinutes = minutes -= 1, because if I remember correctly minutes - 1 will always be the last iteration of the state at time of render - 1, not the last iteration of the state - 1.
  - If (minutes == 0 && hours != 0) {setMinutes(59) and setHours(decrementedHours)} else minutes == 0.
  - Lastly, in the case that seconds == 0 && minutes == 0, setIsExpired(true). - hours by this point hopefully should be set to 0 already.

My hope is that this particular function can handle the rendering of the time, and that when seconds and minutes and hours are 0, an elapsed state can render in place of the timer, that maybe has a button that starts a new timer based on the initial time given (a restart timer button) and or a cancel/close timer button.

### Step 5

Now that the timer can has been created, can intake "newTimerParams" and has been refactored to dynamically display HRs:MINs or Secs, I need to dynamically style the timers once they're created.

My next step should be nailing down the design of the various timers in Figma, and then replicate them in code with ChakraUI. I need:

- A particular Game's Timer, for when the timer has been created and is active.
- A version of that timer that renders when the `isExpired` state is triggered, to handle the situation when the timer is expired.
- Possibly a version of the timer for when it's paused. Update Progress Bar to switch off the `isIntermediate` prop to the Progress Bar Component.

Once that is completed and implemented, I need to style and nail down the Timer Creation Modal, and the general styling of the site, maybe it's time to start some branding for Playtimer.

### Note for a feedback.

Timer - Active - maybe we can use a pulse effect on the timers border color [like so](https://www.florin-pop.com/blog/2019/03/css-pulse-effect/). Maybe [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow) can be an alternative to the dropshadow CSS if for some reason it doesn't work.

Timer - Expired/Paused - and if the timer is paused or expired, we can make the border color a darker hue of it's own color, and then also use [filter to turn down the brightness of the background image](https://stackoverflow.com/questions/11535392/how-to-decrease-image-brightness-in-css).
