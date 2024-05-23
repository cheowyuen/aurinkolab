Library : i18next

# How to add a new language to the application:

## Step 1

Create a new folder in the frontend/public/locales with abbreviation of the new language, for example 

"en" for English. 

Inside, create a new file .json with the name "translation"

Note: all of the files inside the languages folder will be named "translation"

![image](https://github.com/AurinkoLab/website/assets/69098107/cead9016-27fe-4447-9f45-62d1ad2dbb2b)

## step 2

You can copy and page all of the keys inside English translation in order to be sure that you have all of the keys that maps the text in the application, then you have to add the language version of that key in your translation json file.

## step 3

if you need to create new content in the application you will have to create keys for the text and add it to all of the languages available. 

to create a key that maps text you have to:
- call the module in the component 
```bash
import { useTranslation } from "react-i18next";
```
- create a variable inside the function of the component to call the "t" function:

```bash
 const {t} =useTranslation()
```
- Then you can add a new key for mapping a text:

```bash
{t('Aurinko Partners')}
```

- Then you will have to add this new key to all of the translation files in each language available in order to grantee that the application will have a translation to render for that specific paragraph or text.

  ![image](https://github.com/AurinkoLab/website/assets/69098107/42215b3f-8c06-4a55-a230-3e1f46c23dd0)



