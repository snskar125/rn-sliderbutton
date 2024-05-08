# @snskar125/rn-sliderbutton

Slider Button Component for React Native

## Usage

```javascript
import SliderButton from "@snskar125/rn-sliderbutton";
export default function App() {
  return (
    <SliderButton
      onSuccess={() => {
        console.log("Success");
      }}
      onFail={() => {
        alert("Slide Button to Continue");
      }}
    />
  );
}
```

## Props

| Prop                  | Type       |
| --------------------- | ---------- |
| onSuccess             | Function   |
| onFail                | Function   |
| width                 | Number     |
| icon                  | Element    |
| buttonSize            | Number     |
| containerBorderRadius | Number     |
| buttonBorderRadius    | Number     |
| backgroundColor       | String     |
| buttonColor           | String     |
| padding               | Number     |
| disabled              | Boolean    |
| label                 | String     |
| labelStyle            | Text Style |
