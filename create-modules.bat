@echo off

npm install --save-dev @nx/angular

@REM npx nx g @nx/angular:host workspace --add-tailwind --directory=modules/workspace --prefix=workspace --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote secas --host=workspace --add-tailwind --directory=modules/secas --prefix=secas --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote fatur --host=workspace --add-tailwind --directory=modules/fatur --prefix=fatur --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote analy --host=workspace --add-tailwind --directory=modules/analy --prefix=analy --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote conti --host=workspace --add-tailwind --directory=modules/conti --prefix=conti --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote logis --host=workspace --add-tailwind --directory=modules/logis --prefix=logis --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote produ --host=workspace --add-tailwind --directory=modules/produ --prefix=produ --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote rehum --host=workspace --add-tailwind --directory=modules/rehum --prefix=rehum --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote atend --host=workspace --add-tailwind --directory=modules/atend --prefix=atend --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided
npx nx g @nx/angular:remote supri --host=workspace --add-tailwind --directory=modules/supri --prefix=supri --style=scss --e2eTestRunner=cypress --projectNameAndRootFormat=as-provided

echo Todos os modulos foram criados
pause
