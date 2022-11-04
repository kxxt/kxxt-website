---
title: Use Your Android Devices as Cameras for OpenCV
date: 2022-11-04
tags: [opencv, droidcam, python]
description: Your android devices are good camera input sources for OpenCV, especially when you do not have camera modules at hand.
published: true
---

# Why?

- Android devices are common and cheap. You probably have tons of old phones.
- Within a normal wireless local area network, the latency is usually negligible for most use cases.
- Why not? It's a good opportunity to make use of your old phones.

# How

First, you need an android app which acts as a webcam.

I find [droidcam](https://www.dev47apps.com/) a good fit.

The free version allows you to make your android phone a web cam with a resolution of `640x480`. But it will add a watermark on the top left of the picture.

Then you can use your phone as an input source to OpenCV.

<CH.Section>

```python example.py
import cv2 as cv

ip = input("IP address of your phone: ")
vid = cv.VideoCapture(f"http://{ip}:4747/video?640x480")

while True:
    ret, frame = vid.read()
    if not ret:
        raise "Failed to read image!"
    cv.imshow('image', frame)
    if cv.waitKey(1) & 0xFF == ord('q'):
        break

vid.release()
cv.destroyAllWindows()
```

Of course, you can connect multiple android devices to OpenCV. It's just a matter of creating multiple _`cv.VideoCapture`_ instances. 

</CH.Section>

# Drawbacks

I find if your android device locks its screen, you can no longer receive camera input. (Possibly due to Android 12 only allowing apps to use camera when the user is using them).

You can use an app like [Wakey](https://play.google.com/store/apps/details?id=com.doublep.wakey) to circumvent this issue.

# Alternatives

[`iriun`](https://iriun.com/) is a good alternative to droidcam, but it only allows one connection at the same time, which means you can only use one android device as camera in your code at the same time.

But `iriun` does implement something that droidcam doesn't provide. It generates a virtual camera device so that you can use it as a normal camera in OpenCV: `cv.VideoCapture(ID_OF_IRIUN_VIRTUAL_CAMERA_DEVICE)`.

