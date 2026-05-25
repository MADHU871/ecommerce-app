pipeline {

    agent any

    environment {

        IMAGE = "mad0008271/ecommerce-app"

    }

    stages {

        stage('Git Checkout') {

            steps {
                git 'https://github.com/MADHU871/ecommerce-app.git'
            }
        }

        stage('Docker Build') {

            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Docker Push') {

            steps {

                withDockerRegistry([], 'dockerhub') {

                    sh 'docker push $IMAGE'
                }
            }
        }

        stage('Run Container') {

            steps {

                sh '''
                docker stop ecommerce-container || true
                docker rm ecommerce-container || true

                docker run -d \
                --name ecommerce-container \
                -p 3000:3000 \
                $IMAGE
                '''
            }
        }
    }
}