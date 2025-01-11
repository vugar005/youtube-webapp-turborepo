# Youtube microfrontend using Angular, Module Federation. Turborepo edition.

<img src="https://github.com/vugar005/vg-common/blob/main/images/youtube-lighthouse-v4.png" alt="Youtube Angular brand" width="100%"  height="auto">

 [![](https://img.shields.io/badge/about%20Project-blue?style=for-the-badge)](#about-project)
 [![](https://img.shields.io/badge/features-blue?style=for-the-badge)](#features)
 [![](https://img.shields.io/badge/demo-blue?style=for-the-badge)](#demo)
 [![](https://img.shields.io/badge/getting%20started-blue?style=for-the-badge)](#getting-started)
 [![](https://img.shields.io/badge/upgrade%20guide-blue?style=for-the-badge)](#upgrade-guide)
 [![](https://img.shields.io/badge/Contribution%20guide-blue?style=for-the-badge)](#contribution-guide)
 [![](https://img.shields.io/badge/the%20Mission-blue?style=for-the-badge)](#mission)
 [![](https://img.shields.io/badge/about%20author-blue?style=for-the-badge)](#about-author)
 

<a id="about-project"></a>
## About Project
---
**Disclaimer**:

*This is project is for education purpose only and was made to illustrate example of building microfrontend using Angular, Module Federation.*   

---

**NOTE**:

For version 14 with standalone components use [14.x branch](https://github.com/vugar005/youtube-webapp-turborepo/tree/14.x)   
For version 13 without standalone components use [13.x branch](https://github.com/vugar005/youtube-webapp-turborepo/tree/13.x)


**There is 1 host (shell) and 3 remote apps (watch-app, likes-app, history-app). Each app is deployed to different hosting storage.**     

**There are 4 versions of source codes available:**   
🏄 [Turborepo (Current Repo)](https://github.com/vugar005/youtube-webapp-turborepo)   
🏄[Nx](https://github.com/vugar005/youtube-webapp-nx)   
🏄[Lerna](https://github.com/vugar005/youtube-webapp-lerna)  
🏄[NextJs (without microfrontend)](https://github.com/vugar005/youtube-webapp-next)

---
**NOTE**:

*Server side rendering is implemented only on Lerna and Turborepo edition*

---

<a id="features"></a>
## Features:   
✅ Multiple Angular applications on different domains   
✅ Shared UI components and utils  
✅ NgRx Store state management on each application   
✅ Communication between angular applications   
✅ Routing between applications     
✅ Server Side Rendering   

And others:   
✅ Theming   
✅ Keyboard shortcuts


<a id="mission"></a>
## Mission:
My mission is to make complex microfrontend app to have many use cases for developers.

<a id="demo"></a>
## Demo: ▶
[https://web.archive.org/web/20241224011039/http://youtube.vugar.app/]()
---
**NOTE**:

*Hosted application is using Turborepo edition repo*

---

<a id="getting-started"></a>
## Getting Started 🚀
### Prerequisites
<b>NodeJs</b>: v18+

1- Install turbo globally:
```bash 
npm install turbo@1.10.1 -g
```  
2- On root project install dependencies:
```bash
npm install
```  
3- Start project and navigate to localhost:4200:  
```bash
npm run serve
```  

Or you can start in SSR mode:
```  
npm run serve:ssr
```

Other commands: please see ```package.json``` for other commands. 

---
**NOTE**:

*In case of error that components are not exported from youtube/common-ui, on project root run command ```npm run clean:cache``` and then ```npm run serve```*

---

<a id="tech-stack"></a>
## Tech Stack:   
<div style="display:flex;">
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/angular.svg" title="Angular" alt="Angular" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/material.svg" title="Angular Material" alt="Angular Material" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/angular-universal.svg" title="Angular Universal" alt="Angular Universal" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/nestjs.svg" title="Angular Universal" alt="Angular Universal" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/ngrx.svg" title="NgRx" alt="NgRx store" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/rxjs.svg" title="NgRx" alt="NgRx store" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/turborepo.svg" title="Turborepo"  alt="Turborepo" height="120"/>
</div>

<a id="compate-nx-turborepo-lerna"></a>
## Tooling Tradeoffs
Here is my experience working with Lerna, Nx, and Turborepo. This can be inaccurate.

|                           |                                                                                                                      Lerna                                                                                                                      |                                                                                                                   Nx                                                                                                                   |                                                                                                            Turborepo                                                                                                            |
|:--------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Library support           |                                                                                   ✅<br/>Both same and different versions of libraries (such as Angular, RxJs)                                                                                   |                                                                                                          ❌<br/>Monorepo only                                                                                                           |                                                                                                       ❌<br/>Monorepo only                                                                                                       |
| Native (Angular CLI)      |                                                                                                                        ✅                                                                                                                        |                                                                                                           ❌<br/>Uses Nx CLI                                                                                                            |                                                                                                                ✅                                                                                                                |
| Development efficiency    |                                                                                        ❌<br/>Slow. Rebuild on any changes to common packages such as UI                                                                                         |                                                                                                            ✅<br/>Very fast                                                                                                             |                                                                                                                ✅                                                                                                                |
| Dependency graph          |                                                                                                                 ❌<br/>No graph                                                                                                                  |                                                                                                             ✅<br/>Powerful                                                                                                             |                                                                                                                ✅                                                                                                                |
| Application configuration |         ❌<br/><div style="text-align:center;"><ul style="display: inline-block; text-align: left;"><li>Required change to `angular.json`</li><li>Switched to `ngx-build-plus` builders to support custom webpack config</li></ul></div>         | ❌<br/><div style="text-align:center;"><ul style="display: inline-block; text-align: left;"><li>Required change to `angular.json`</li><li>Switched to Nx officially-supported builders to support custom webpack config</li></ul></div> |   ❌<div style="text-align:center;"><ul style="display: inline-block; text-align: left;"><li>Required change to `angular.json`</li><li>Switched to `ngx-build-plus` builders to support custom webpack config</li></ul></div>    |


<a id="upgrade-guide"></a>
## Upgrade Guide
To upgrade angular applications. Example:

**On root:**

```
npx @angular/cli@13 update @angular/core@13 @angular/cli@13 --force
```

**On each remote app:**

``` 
ng update @angular/core --migrate-only=true --from=13 --to=14
ng update @angular/cli --migrate-only=true --from=13 --to=14
```

## Common Questions
**1- Why I pass data via Input to remote apps?**   
The microfrontends apps(such as history or likes app) are NOT meant to be dependent on shell app.The reason I put inputs there is that I did not want to create additional Rest API for this(or signals such as socketjs) since I waslazy. Nevertheless, there are some cases where putting data via Input is very useful such as the current app state(ex: current playing videoId). For example, in my case, I deliberately inform Shell app from video-app that that I click on Like button(in real life we would do this via API of course). Sole purpose of this to provide example for communication between apps.So I strongly agree that remote apps should not be dependent on shell app for Data and the **only reason** I put Input is to give example how can we pass data to remotes which could be done without Signals(socketjs) APIs. The rest cases should be done via APIs.

## What is next?
Currently, the unit tests were not aded since the project was focused on main features such as module federation, managing state, intercommucation and so on. It can be started soon.   

<a id="backlog"></a>
### Backlog 
1) Add I18n translations
2) Add secondary entry points for common-ui  

<a id="contribution-guide"></a>
## Contribution guide 🌴
Want to contribute to improve community app? Looking forward for pull requests. Let's get started :)

## Supporting guide
Found repo useful? :) Let's star it ⭐

<a id="references"></a>
## References
Book: https://www.angulararchitects.io/en/book/   
My blog: https://medium.com/p/258f331bc11e   
Big thanks to https://github.com/manfredsteyer for his contribution for a lot of useful blogs + book for building microfrontend.

<a id="about-author"></a>
## About author 🌴🏌️
Xtreme Junior Front end developer focused on nice architecture and long term webapps.
