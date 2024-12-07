pipeline {
    agent any
  
  stages {
      stage('deploy docker images!') {
           when {
              branch "devops"
          }
          steps {
            echo 'building ...'
            sh 'docker build -t backend .'
         }
      }
  }
      post {
        always {
          echo 'This will always run' 
         
          echo 'Deploying Recyclovision...'
          sh 'docker compose --project-name Recyclovision up -d'
          echo 'Recyclovision Deployed'
        }
    }
}