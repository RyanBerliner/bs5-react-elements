# Bootstrap 5 React Elements

[![View on npmjs.com](https://img.shields.io/npm/v/bs5-react-elements)](https://www.npmjs.com/package/bs5-react-elements)

**See [https://ryanberliner.com/bs5-react-elements/](https://ryanberliner.com/bs5-react-elements/) to view full documentation.**

React elements that *use, not replace,* Bootstrap 5 javascript. They expose Bootstrap's existing events and api in a convenient, predictable, and flexible way to your React project.

**This is not a React re-write of Bootstrap javascript.** Because of this, there isn't much to learn! If you use Bootstrap, you know almost everything there is to know about this library.
When it comes to customizing your Bootstrap components look or behavior, refer to the [official Bootstrap documentation.](https://getbootstrap.com/)
</p>

## Installing

Use your package manager to install into your React project.

```npm i bs5-react-elements```

**Important!** Bootstrap, and any of its dependencies are NOT bundled with this library. You will need to install Bootstrap and its dependencies yourself.

Not using a bundler? See the other [installation options](https://ryanberliner.com/bs5-react-elements/installation-options/) to begin using this library.

## Example Usage

This is a tooltip that will listen for Bootstrap `shown.bs.tooltip` event and console log a message.

```
import React, {useCallback} from "react";
import {Tooltip} from "bs5-react-elements";

function ExampleUsage() {
  const onShownHandler = useCallback(() => {
    console.log("The tooltip has been shown.");
  }, []);

  return <Tooltip
    title="Lorem ipsum dolor."
    data-bs-toggle="tooltip"
    onShown={onShownHandler}
  >
    Lorem ipsum
  </Tooltip>;
}
```

For more information on this libary, refer to the full documentation at [https://ryanberliner.com/bs5-react-elements/](https://ryanberliner.com/bs5-react-elements/)
