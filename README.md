# financeo - money management system

## Feauters and usage 
Financeo is an extraordinary budget book, that creates entires based on api calls to open apis.
Of course typical budget book features to enter earnings and spendings are supported as well. 

Additionally financeo enables it users to create their own savings- and / or personal investment plans. 
Its backend is backed by lambda functions of firebase, that hold scikit and tensorflow business logic, that  
provide data analytics and prediction-model creation features. The usage of GPT-3s APIs in combination to 
basic scraping (implemented through famous financial information apis) and another set of lambda functions 
providing basic NLP / NLU features shall enable the user to analyze trends to incorporate fundamental analysis techniques. 

## technical aspects

Frontend 
Basically financeo consists of a react / redux frontend which uses basic design elements of MUI (material UI). 
Charts will be integrated via NIVO, victory and React-vis.

Backend
Lambda functions simulate necessary business logic that would usually be implemented by a backend. 
Firebase provides a document based database. 
Due to personal knowledge data-sensitive business logic is going to be implemented via python, scitkit-learn and tensorflow. 
NLP and NLU functions are going to be implemented by spacy, nltk and gpt3. 





