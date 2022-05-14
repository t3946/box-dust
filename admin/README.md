# Project build in dev mode

+ ```npm run watch``` from project root
+ ```gulp``` from resources/gulp

# Project Hierarchy

```
App
├───Services — any user code, this is not system dir
│
└───Models — user models
```

# Setup
Создать ссылку в папке \public на \storage\app\public

## Windows
d:
mklink /D "D:\storage" "D:\OpenServer\domains\localhost\box-dust\storage\app\public"
mklink /D "D:\storage" "D:\OpenServer\domains\localhost\box-dust\admin\storage\app\public"
