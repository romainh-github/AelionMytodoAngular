# Hello

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# AelionMytodoAngular
MyTodo, done with angular during formation aelion, is a todo list web application.
This is a student project showcasing developing a web application in javascript with angularJs framework.

To reinstall:

$: cd [yourdevspace]
$: git clone https://github.com/romain-github/AelionMytodoAngular

Install Angular CLI

$: cd [your_project]
$: npm i @angular-cli@latest -g (if angular client is not already installed)


Install dependencies:

$: npm i

Start angular application

$: ng serve

Install external project for backend :
https://github.com/romainh-github/AelionNodeTodo

Start server NodeTodo:
$: npm start


Then go to this url on your favorite browser:
http://localhost:4200


Script SQL to create database :

CREATE DATABASE /*!32312 IF NOT EXISTS*/`todos_repo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `todos_repo`;

/*Table structure for table `todos` */

DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=261 DEFAULT CHARSET=utf8;







