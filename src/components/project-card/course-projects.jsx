import { faBilibili, faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faArchive,
  faExternalLink,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import ProjectCard from "./project-card"
import ProjectCards from "./project-cards"
import cfpsReportImg from "@/imgs/projects/cfps-report.png"
import cfpsJupyterHubImg from "@/imgs/projects/cfps-jupyterhub.png"
import roboticArmImg from "@/imgs/projects/robotic-arm.png"
import selfDrivingCarImg from "@/imgs/projects/self-driving-car.png"
import selfParkingCarImg from "@/imgs/projects/self-parking-car.png"
import TransparentLink from "./transparent-link"
import ExternalLink from "./external-link"

export default function CourseProjects() {
  return (
    <ProjectCards>
      <ProjectCard
        img={cfpsReportImg}
        alt="A screenshot of CFPS report website"
        name="CFPS Report"
        description="Course project for front-end development."
        content={
          <>
            <p>
              <strong>China Family Panel Studies (CFPS)</strong> is a survey
              designed to collect individual-, family-, and community-level
              longitudinal data in contemporary China. The studies focus on the
              economic, as well as the non-economic, wellbeing of the Chinese
              population, with a wealth of information covering such topics as
              economic activities, education outcomes, family dynamics and
              relationships, migration, and health.
            </p>
            <p>
              Our mentor asked us to analyze the CFPS dataset and create a
              beautiful and responsive report website about the difference
              between the rural and urban areas in China and the problems in the
              rural areas. He also asked us to use echarts.js for data
              visualization.
            </p>
            <p>
              I used <strong>Vue.js</strong> for front-end development and
              Python for data analysis. And bulma was chosen as our CSS
              framework because I am familiar with it.
            </p>
          </>
        }
        tags={[
          "website",
          "vue",
          "data-visualization",
          "echarts.js",
          "javascript",
        ]}
        links={[
          {
            link: "https://cfps-report.vercel.app/",
            text: "Website",
            icon: faExternalLink,
            color: "lime",
          },
          {
            link: "https://lie-flat.github.io/slides/",
            text: <>Slides</>,
            icon: faFilePowerpoint,
            color: "orangered",
          },
          {
            link: "https://www.bilibili.com/video/BV11i4y1X7bJ",
            text: <>Bilibili&nbsp;(Frontend)</>,
            icon: faBilibili,
            color: "hotpink",
          },
          {
            link: "https://www.bilibili.com/video/BV1d341187zQ",
            text: <>Bilibili&nbsp;(Data&nbsp;Processing)</>,
            icon: faBilibili,
            color: "hotpink",
          },
          {
            link: "https://github.com/lie-flat/cfps-report",
            text: <>Frontend&nbsp;Code</>,
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://github.com/lie-flat/cfps-analyze",
            text: <>Data&nbsp;Processing&nbsp;Code</>,
            icon: faGithub,
            color: "black",
          },
        ]}
        datetime="From Nov 23, 2021 to Jan 2, 2022"
      />
      <ProjectCard
        img={cfpsJupyterHubImg}
        alt="A screenshot of our platform."
        name="CFPS Data Analysis and Visualization Platform"
        description="Course project for front-end development and database."
        content={
          <>
            <p>
              Our mentor asked us to create a data visualization platform for
              CFPS dataset. He provided us with two choices: JupyterHub or a
              website.
            </p>
            <p>
              We chose JupyterHub because it is more convenient for data
              analysis and visualization. I used <strong>Next.js</strong> for{" "}
              <ExternalLink href="https://github.com/lie-flat/cfps-jupyterhub/tree/master/hub-login">
                front-end development
              </ExternalLink>{" "}
              and <strong>FastAPI</strong> for{" "}
              <ExternalLink href="https://github.com/lie-flat/cfps-jupyterhub/tree/master/backend">
                OAuth2 server implementation
              </ExternalLink>
              . We also used <strong>MySQL</strong> to store the CFPS dataset
              and <strong>Nginx</strong> for reverse proxy. I deployed the
              platform on my cloud server.
            </p>
            <p>
              To solve the problem of echarts.js loading issues when a jupyter
              notebook is shared between different users of our platform, I
              wrote a Jupyter lab plugin named{" "}
              <ExternalLink href="https://github.com/lie-flat/cfps-jupyterhub/tree/master/jupyterlab_cfps_preload">
                <code>jupyterlab-cfps-preload</code>
              </ExternalLink>
              .
            </p>
            <p>
              I take security seriously. I use <strong>Let's Encrypt</strong>{" "}
              for HTTPS and all the users' jupyter lab instance are running in
              an isolated docker container and users can only access the CFPS
              database via a read-only user.
            </p>
            <p>
              Besides security, I also take the user experience seriously. We
              have set up the jupyter lab to{" "}
              <ExternalLink href="https://github.com/lie-flat/cfps-jupyterhub/blob/master/cfps-notebook/startup.py">
                automatically load common libraries
              </ExternalLink>{" "}
              and{" "}
              <ExternalLink href="https://github.com/lie-flat/cfps-jupyterhub/blob/master/cfps_dvapis/sql.py">
                set up the database connection
              </ExternalLink>
              .
            </p>
            <p>
              We created twenty-three kinds of data visualization on our
              platform. The notebook source files are available at{" "}
              <TransparentLink
                target="_blank"
                href="https://github.com/lie-flat/cfps-jupyterhub/tree/master/notebooks"
              />
            </p>
          </>
        }
        tags={[
          "jupyterhub",
          "next.js",
          "data-visualization",
          "echarts.js",
          "docker",
          "jupyter-notebook",
          "fastapi",
          "javascript",
          "python",
          "mysql",
          "docker",
          "nginx",
          "linux",
        ]}
        links={[
          {
            link: "https://github.com/lie-flat/cfps-jupyterhub",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://www.bilibili.com/video/BV1K44y1p7u5/",
            text: "Bilibili",
            icon: faBilibili,
            color: "hotpink",
          },
          {
            link: "https://archive.ph/iMg0E",
            text: <>Archived&nbsp;Page</>,
            icon: faArchive,
            color: "brown",
          },
          {
            link: "https://hub.kxxt.tech/",
            text: <>Website (maybe&nbsp;offline)</>,
            icon: faExternalLink,
            color: "lime",
          },
          {
            link: "https://lie-flat.github.io/slides/",
            text: <>Slides</>,
            icon: faFilePowerpoint,
            color: "orangered",
          },
        ]}
        datetime="From Jan 12, 2022 to Feb 12, 2022"
      />
      <ProjectCard
        img={roboticArmImg}
        alt="Our robotic arm"
        name="Robotic Arm"
        description="Course project for PCB and more."
        content={
          <>
            <p>
              We were asked to create a robotic arm with a camera as
              end-effector. The robotic arm should be able to recognize faces
              and hands and keep its camera centering on the human face. My team
              members designed the mechanical structure of the robotic arm using
              SolidWorks and draw the PCB layout. I wrote the programs for the
              robotic arm with some help from my teammates.
            </p>
            <p>
              I used Raspberry Pi 4B with Manjaro ARM operating system as the
              main controller of the robotic arm. And I used google's famous
              mediapipe library to implement face and hand recognition. I also
              used vosk for voice recognition and pyttsx3 for speech synthesis.
              BTW, I set up an simulation environment for the robotic arm so
              that you can test the program without a real robotic arm.
            </p>
            <p>
              Check out the bilibili video to see the robotic arm in action and
              learn about how it works.
            </p>
          </>
        }
        tags={[
          "robotics",
          "raspberry-pi",
          "manjaro-arm",
          "computer-vision",
          "face-recognition",
          "hand-recognition",
          "voice-recognition",
          "mediapipe",
          "python",
          "speech-synthesis",
          "servo",
          "simulation",
        ]}
        links={[
          {
            link: "https://github.com/kxxt/robotic-arm",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://www.bilibili.com/video/BV1J54y1n7v6/",
            text: "Bilibili",
            icon: faBilibili,
            color: "hotpink",
          },
        ]}
        datetime="From Apr 9, 2021 to Jul 12, 2021"
      />
      <ProjectCard
        img={selfDrivingCarImg}
        alt="Our car, road and one of the traffic signs"
        name="smart-car-deep-learning"
        description="Course project for summer research training program."
        content={
          <>
            <p>
              We were asked to create a smart car that can drive itself(which
              means that the car can follow the lane) and recognize traffic
              signs.
            </p>
            <p>
              The car is powered by an ESP32 board and an ESP32 camera. All the
              deep learning workloads are done on my wirelessly connected
              laptop.
            </p>
            <p>
              We write Arduino programs in C++ using PlatformIO IDE and flash
              them into the ESP32 board/camera. We trained lane segmentation and
              traffic sign detection models using PaddlePaddle. In the end, we
              used OpenCV to do lane following and visualization.
            </p>
          </>
        }
        tags={[
          "esp32",
          "arduino",
          "platform-io",
          "deep-learning",
          "computer-vision",
          "python",
          "c++",
          "object-detection",
          "opencv",
        ]}
        links={[
          {
            link: "https://github.com/lie-flat/smart-car-deep-learning",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://www.bilibili.com/video/BV1GB4y1G7pz",
            text: "Bilibili",
            icon: faBilibili,
            color: "hotpink",
          },
        ]}
        datetime="From July 2022 to Aug 28, 2022"
      />

      <ProjectCard
        img={selfParkingCarImg}
        alt="Showcase of the self-parking process."
        name="smart-car-auto-parking"
        description="Course project for Computer Vision."
        content={
          <>
            <p>
              This is the continuation of our previous course project. This
              time, our mentor asked us to create a smart car that can park
              itself.
            </p>
            <p>
              We used the same hardware as the previous project. We use a single
              android phone as the only camera to determine the position and
              rotation of the car. As you can see, we used an ArUco board for
              pose estimation. We also used OpenCV to do the visualization that
              you see in the picture.
            </p>
            <p>
              We trained our car agent using stable-baselines3 and pybullet. In
              the end, the car agent can park itself whether it is in simulation
              or in reality.
            </p>
            <p>
              Learn more about how we did it by watching the bilibili videos.
            </p>
          </>
        }
        tags={[
          "esp32",
          "arduino",
          "platform-io",
          "reinforcement-learning",
          "computer-vision",
          "python",
          "c++",
          "opencv",
          "pybullet",
          "ArUco",
        ]}
        links={[
          {
            link: "https://github.com/kxxt/chatgpt-action",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://www.bilibili.com/video/BV1N24y1y7Zt",
            text: <>Bilibili&nbsp;(Pose&nbsp;Tracing)</>,
            icon: faBilibili,
            color: "hotpink",
          },
          {
            link: "https://www.bilibili.com/video/BV1C84y1W7zS",
            text: <>Bilibili&nbsp;(Self&nbsp;Parking)</>,
            icon: faBilibili,
            color: "hotpink",
          },
          {
            link: "https://lie-flat.github.io/smart-car-auto-parking/positioning",
            text: <>Slides&nbsp;(Pose&nbsp;Tracing)</>,
            icon: faFilePowerpoint,
            color: "orangered",
          },
          {
            link: "https://lie-flat.github.io/smart-car-auto-parking/streaming",
            text: <>Slides&nbsp;(Streaming)</>,
            icon: faFilePowerpoint,
            color: "orangered",
          },
        ]}
        datetime="From Nov 3, 2022 to Feb 9, 2023"
      />
    </ProjectCards>
  )
}
