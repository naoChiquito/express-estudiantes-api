pipeline {
   agent any
   stages {
     stage('Clonar codigo') {
       steps {
          git branch: 'master', url: "https://github.com/naoChiquito/express-estudiantes-api.git"
       }
     }
     stage('Construir imagen') {
       steps {
        script{
            def IMAGE_NAME = "estudiantes-api"
            def TAG = "${IMAGE_NAME}:${env.BUILD_ID}"        
            echo "Construyendo imagen Docker: ${TAG}"
            sh "docker build -t ${TAG} ."
            echo "Imagen construida con éxito."
        }
       }
     }
     stage('Deploy') {
       steps {
         sh 'echo "Ejecutando pruebas..."'
       }
     }
  }
}

