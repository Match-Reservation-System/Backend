#---------------------------------------
# install typescript and @types/node
npm install -D typescript @types/node
# intialize typescript
npx tsc --init
#---------------------------------------
#install jasmine
npm install -D jasmine
# install jasmine types
npm install -D @types/jasmine
# install jasmine spec reporter
npm install -D jasmine-spec-reporter
# intialize jasmine
npx jasmine init
#---------------------------------------
# install eslint
npm install -D eslint
# install prettier
npm install -D prettier
# install eslint prettier plugin
npm install -D eslint-plugin-prettier
# install eslint prettier config
npm install -D eslint-config-prettier
# install eslint typescript plugin
npm install -D @typescript-eslint/eslint-plugin
# install eslint typescript parser
npm install -D @typescript-eslint/parser
#---------------------------------------
# install express
npm install express
# install @types/express
npm install -D @types/express
# install nodemon amd ts-node
npm install -D nodemon ts-node
#---------------------------------------
# install pg
npm install pg
# install @types/pg
npm install -D @types/pg
#---------------------------------------
# install body-parser
npm install body-parser
# install @types/body-parser
npm install -D @types/body-parser
#---------------------------------------
# install dotenv
npm install dotenv

#create if not exists .gitignore file
touch -a .gitignore
#---------------------------------------
# create if not exists .nvmrc file
touch -a .nvmrc
#---------------------------------------
# create if not exists .prettierrc file
touch -a .prettierrc
#---------------------------------------
# create if not exists .prettierignore file
touch -a .prettierignore
#---------------------------------------
# create if not exists .eslintrc file
touch -a .eslintrc
#---------------------------------------
# create if not exists .eslintignore file
touch -a .eslintignore
#---------------------------------------



