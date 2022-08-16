set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f https://github.com/Szadziu/turnbasedgame.git master:gh-pages

cd -