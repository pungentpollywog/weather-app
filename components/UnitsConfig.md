# Multi Config custom component 

## Summary

This will be a units configuration component meant to toggle between **metric** and **imperial** units. The output, or selected value, will be either metric or imperial. 

There will be a trigger button that will hide or reveal the options. 

There will be a button at the top to enable toggling between metric and imperial. 

This component has a list of nested objects. At the top of the hierachy is category (i.e. temperature). Nested within each category are two options one for metric and the other for imperial. For example, ...

```js
{
  category: 'Temperature',
  {
    metric: 'Celsius (&deg;C)',
    imperial: 'Fahrenheit (&deg;F)'
  }
}
```
This list of objects is for display only. If metric is selected, there will be a check icon following each metric option. Otherwise, the check icons will follow the imperial options.

It will be anchored to a trigger button using [CSS anchor positioning](https://developer.chrome.com/docs/css-ui/anchor-positioning-api). The default anchoring will be bottom right.

## Icons

https://docs.boxicons.com/

## TODOs

- Add anchor positioning 
- Add custom event emitter (toggle between metric and imperial) 
- Add fetch for location search
- Add fetch for weather forcast at selected location
- Add loading state 
- Add no result found state
- Add hover styling
