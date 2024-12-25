pipeline {
  agent any
  
  stages {
    stage('login to ecr') {
      when {
        branch "devops"
      }
      steps {
        echo 'logging in ...'
        sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 381491905102.dkr.ecr.us-east-1.amazonaws.com'
        }
      }
    

    stage('building docker image') {
      when {
        branch "devops"
      }
      steps {
        echo 'building ...'
        sh 'docker build -t recyclovision/backend .'
      }
    }

    stage("tagging image") {
      when {
        branch "devops"
      }
      steps {
        echo 'tagging ...'
        sh 'docker tag recyclovision/backend:latest 381491905102.dkr.ecr.us-east-1.amazonaws.com/recyclovision/backend:latest'
      }
    }

    stage("pushing image") {
      when {
        branch "devops"
      }
      steps {
        echo 'pushing ...'
        sh 'docker push 381491905102.dkr.ecr.us-east-1.amazonaws.com/recyclovision/backend:latest'
      }
    }
  }
  
  post {
    always {
      echo 'This will always run'      
      echo 'Deploying Recyclovision...'
      sh 'docker compose --project-name recyclovision --env-file ~/.env up -d'
      echo 'Recyclovision Deployed'
    }
  }
}