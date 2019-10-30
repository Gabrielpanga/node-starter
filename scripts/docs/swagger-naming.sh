# Add all models that need to be replaced on swagger generation
sed -i '' "s/IUser/User/g" swagger.json