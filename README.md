# cs7is5-adaptapp

Here comes the sample code!

## Installation

Environment and dependencies managed using `pipenv`
(considering dockerization)

To install dependencies:

```bash
pipenv install
```

To enter the environment:

```bash
pipenv shell
```

To exit the environment:

```bash
exit
```

## Architecture

The code has layers from top to bottom:

- `controller`: where to validate a request
- `biz`: where biz logic lies
- `service`: where there is some basic logic (depends)
- `datasources`:
  - `model`: mongodb connection
  - `cache`: redis connection
  - `mq`: redis connection (mainly sending messages according to users' actions)

We have to hold the static files for our SPA.

## Git Workflow/Strategy

stability from high to low:

- `master`: code should always be able to run (without bugs).
- `test`: where new features will be tested before merging into the `master` branch, after a `milestone` branch is merged. There might have a integrated test.
- `milestone#`: this is a scrum branch, one scrum period one milestone branch. This branch should have a nightly build.
- `feature#`: this is a branch for one feature, there might be some priorities between features, which means that some feature implements first. It depends on the funcitonality and design.
