# Youtube clone using Angular, Module Federation. Turborepo edition.

<img src="https://github.com/vugar005/vg-common/blob/main/images/Youtube-logo.webp" alt="Youtube Angular brand" width="100%"  height="400px">

---
**NOTE**:

*This is project is for educaiton purpose only and was made to illustrate example of building microfrontend using Angular, Module Federation.*   

---

There is 1 host (shell) and 3 remote apps (watch-app, likes-app, history-app).     

There are 3 versions of source codes available:   
[Turborepo (Current Repo)](https://github.com/vugar005/youtube-webapp-turborepo)   
[Nx](https://github.com/vugar005/youtube-webapp-nx)   
[Lerna](https://github.com/vugar005/youtube-webapp-lerna)  

---
**NOTE**:

*Server side rendering is implemented only on Lerna and Turborepo edition*

---

## Features:   
☑ Multiple Angular applications on different domains   
☑ Shared UI components and utils  
☑ NgRx Store state management on each application   
☑ Communication between angular applications   
☑ Routing between applications     
☑ Server Side Rendering   

## Demo: ▶
http://youtube.vugar.app
---
**NOTE**:

*Hosted application is using Turborepo edition repo*

---

## Getting Started 🚀
### Prerequisites
Since workspaces are available from npm v7, you should have <b>NodeJs 16+</b> installed.

1- Install turbo globally:
```bash 
npm install turbo@1.1.4 -g
```  
2- On root project install dependencies:
```bash
npm install
```  
3- Start project and navigate to localhost:4200:  
```bash
npm run serve
```
Other commands: please see ```package.json``` for other commands. 

---
**NOTE**:

*In case of error that components are not exported from youtube/common-ui, on project root run command ```npm run clean``` and then ```npm install```*

---

## Tech Stack:   
<div style="display:flex;">
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/angular.svg" title="Angular" alt="Angular" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/material.svg" title="Angular Material" alt="Angular Material" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/angular-universal.svg" title="Angular Universal" alt="Angular Universal" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/nestjs.svg" title="Angular Universal" alt="Angular Universal" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/ngrx.svg" title="NgRx" alt="NgRx store" height="120"/>
<img src="https://github.com/vugar005/vg-common/blob/main/icons/brands/turborepo.svg" title="Turborepo"  alt="Turborepo" height="120"/>
</div>


## Pros and cons of Nx, Turborepo and Lerna tools
Below are just my experiences working in those tools. They can be inaccurate.   
### Lerna
✅ Supports both same and different versions of libraries (such as Angular, RxJs)   
✅ 100% Native. No need to change configuration of applications (such as angular.json) to make it work  
❌ Slow development efficiency. Rebuild everytime you make changes to common packages such as UI   
❌ No dependency graph   

### Nx
❌ Not supports both same and different versions of libraries (such as Angular, RxJs). Only Monorepo.   
❌ Not native. Needs to change configuration of applications (such as angular.json).   
  Uses custom plugins instead of native angular/cli. Problems with adding new packages (such as ssr)   
✅ Very fast development efficiency   
✅ Poweful dependency graph   

### Turborepo
❌ Not supports both same and different versions of libraries (such as Angular, RxJs). Only Monorepo.   
✅ Native. No need to change configuration of applications (such as angular.json).   
✅ Fast development efficiency   
✅ Dependency graph  

## What is next?
Currently, the unit tests were not aded since the project was focused on main features such as module federation, managing state, intercommucation and so on. It can be started soon.

## Contribution guide 🌴
Want to contribute to improve community app? Looking forward for pull requests. Let's get started :)

## Supporting guide
Found repo useful? :) Let's star it ⭐

## About me 🌴🏌️
Xtreme Junior Front end developer focused on nice architecture and long term webapps.
