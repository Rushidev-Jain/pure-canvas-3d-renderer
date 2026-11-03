# Pure Canvas 3D Renderer

A browser based 3D simulation experiment built from scratch with JavaScript and HTML Canvas. This project is a sprint exploration of projection, gravity, collision, and friction in a minimal setup without OpenGL or external graphics libraries or dlls.

```published on 11th July : 6 contributions [reuploaded repository]```

## Demo

- [Here is the Demo video.](https://github.com/user-attachments/assets/4c0b05b8-4ac2-428b-9f0a-97557bf92948)
A demo video is included in this repository.

## Authors
Rushidev Gajanan Ukalkar
- [email](rushidevjain@gamil.com) & [teleg](https://t.me/uku_jain)

## How to Run

1. Download or clone the repository.                      <kbd>git clone "https://github.com/RushidevJain/pure-canvas-3d-renderer"</kbd>
2. Open `index_1st.html` in a modern web browser otherwise Install the "Ritwickdey.LiveServer" Extention of VS-Code and press Go Live in the bottom right.    
3. Make sure `index_1st.js` is linked correctly in the HTML file.      (optional)
4. If the browser blocks local files, run it with a simple local server.

## Notes

* Non Matrix Multiplication (my personal method) of rendering a 3D mesh in 2D.
* Mathematical Insights
* Pure JavaScript
* HTML Canvas rendering
* 3D simulation and physics experiment
* No external graphics engine

## Me vs Others' Methods
my approach:
- let x' and y' are the screen co-ordinates variables.
- and let the x, y, z are the 3D space Co-ordinates.
- bcz there is not soln of M*[x, y, z, w] = [x/z, y/z.. ]. there is no matrix that can give x/y & y/z as 1st 2 outputs so i declared them in the following way directly
- x' = x/z    //similar triangle wali se
- y' = y/z   // declared in the screen or transform function

## Logic Short Notes

1. 3D-to-2D Projection Pipeline     

$$p = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

$$p_1 = R_x(\theta_x)p, \quad p_2 = R_y(\theta_y)p_1, \quad p_3 = R_z(\theta_z)p_2$$

$$p_4 = T p_3, \quad p_5 = P p_4$$

$$x_{\text{screen}} = \frac{f \cdot p_5.x}{p_5.z}, \quad y_{\text{screen}} = \frac{f \cdot p_5.y}{p_5.z}$$

---

2. Rotation Matrices

$$R_x(\theta) = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta & 0 \\ 0 & \sin\theta & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$$R_y(\theta) = \begin{bmatrix} \cos\theta & 0 & \sin\theta & 0 \\ 0 & 1 & 0 & 0 \\ -\sin\theta & 0 & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$$R_z(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 & 0 \\ \sin\theta & \cos\theta & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

---

3. Translation & Perspective Projection

$$T = \begin{bmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad P = \begin{bmatrix} f & 0 & 0 & 0 \\ 0 & f & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & \frac{1}{f} & 0 \end{bmatrix}$$

$$\text{Combined Transform:} \quad p' = P T R_z R_y R_x p$$

---

4. Kinematics (Euler Integration)

$$v_y(t + \Delta t) = v_y(t) + g\Delta t$$

$$x(t + \Delta t) = x(t) + v_x\Delta t, \quad y(t + \Delta t) = y(t) + v_y\Delta t, \quad z(t + \Delta t) = z(t) + v_z\Delta t$$

---

5. Ground Collision & Damping

$$\text{if } y \le y_{\text{ground}} \implies y = y_{\text{ground}}$$

$$v_y = -e \cdot v_y, \quad v_x = v_x(1 - \mu), \quad v_z = v_z(1 - \mu)$$

---

6. Wireframe Edge Rendering

$$\text{Edge } (a, b): \quad \text{Draw line from } \left( \frac{f \cdot x_a}{z_a}, \frac{f \cdot y_a}{z_a} \right) \text{ to } \left( \frac{f \cdot x_b}{z_b}, \frac{f \cdot y_b}{z_b} \right)$$
