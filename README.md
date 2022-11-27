# Evo

Inspired by `lightdm-gab-gradient` and `Aether`.

A modern and sleek theme for LightDM WebKit2.

## **[Try the demo version here](https://evo.xwork.space)**

## Requirements
- [lightdm-webkit2-greeter (aur/lightdm-webkit2-greeter)](https://github.com/Antergos/lightdm-webkit2-greeter)

## Installation
```
git clone https://github.com/AlphaNecron/lightdm-evo.git
sudo cp -r lightdm-evo /usr/share/lightdm-webkit/themes/lightdm-evo

# Set default lightdm-webkit2-greeter theme to Evo
sudo sed -i 's/^webkit_theme\s*=\s*\(.*\)/webkit_theme = lightdm-evo #\1/g' /etc/lightdm/lightdm-webkit2-greeter.conf

# Set default lightdm greeter to lightdm-webkit2-greeter
sudo sed -i 's/^\(#?greeter\)-session\s*=\s*\(.*\)/greeter-session = lightdm-webkit2-greeter #\1/ #\2g' /etc/lightdm/lightdm.conf
```

## Screenshots
![Screenshot](https://user-images.githubusercontent.com/57827456/155882259-9bb2103a-8928-49a7-9f61-7f534e220ac5.png)
![Screenshot](https://user-images.githubusercontent.com/57827456/155882285-fd9223f6-309c-414d-b809-d276b7b6895b.png)

## Credit
- [Here](https://www.artstation.com/artwork/XBb9Pn) for the incredible artwork!
- `GabrielTenma` for `mock.js`.
- People on StackOverflow for useful solutions.
