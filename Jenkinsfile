pipeline {

    agent any

    environment {

        IMAGE_NAME = "mad0008271/ecommerce-app"
        CONTAINER_NAME = "ecommerce-container"

    }

    stages {

        stage('Git Checkout') {

            steps {

                git branch: 'main',
                url: 'https://github.com/MADHU871/ecommerce-app.git'

            }
        }

        stage('Check Files') {

            steps {

                sh 'pwd'
                sh 'ls -la'

            }
        }

        stage('Docker Build') {

            steps {

                sh '''
                docker build -t $IMAGE_NAME .
                '''

            }
        }

        stage('Docker Login') {

            steps {

                withCredentials([usernamePassword(

                    credentialsId: 'dockerhub-creds',

                    usernameVariable: 'DOCKER_USER',

                    passwordVariable: 'DOCKER_PASS'

                )]) {

                    sh '''
                    echo $DOCKER_PASS | docker login \
                    -u $DOCKER_USER \
                    --password-stdin
                    '''

                }
            }
        }

        stage('Docker Push') {

            steps {

                sh '''
                docker push $IMAGE_NAME
                '''

            }
        }

        stage('Docker Pull') {

            steps {

                sh '''
                docker pull $IMAGE_NAME
                '''

            }
        }

        stage('Stop Old Container') {

            steps {

                sh '''
                docker stop $CONTAINER_NAME || true

                docker rm $CONTAINER_NAME || true
                '''

            }
        }

        stage('Docker Run') {

            steps {

                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                -p 3007:3000 \
                $IMAGE_NAME
                '''

            }
        }

        stage('Docker Logs') {

            steps {

                sh '''
                docker logs $CONTAINER_NAME
                '''

            }
        }

        stage('Docker Copy') {

            steps {

                sh '''
                mkdir -p backup

                docker cp \
                $CONTAINER_NAME:/app/package.json \
                backup/package.json || true
                '''

            }
        }

        stage('Docker Error Check') {

            steps {

                sh '''
                docker ps -a

                docker images
                '''

            }
        }

        stage('Cloudflare Trigger') {

            steps {

                echo 'Cloudflare deployment triggered automatically'

            }
        }

        stage('Automation Complete') {

            steps {

                echo 'Full CI/CD DevOps Pipeline Completed Successfully'

            }
        }
    }

    post {

        success {

            echo 'Pipeline executed successfully'

        }

        failure {

            echo 'Pipeline failed. Check Jenkins logs.'

        }
    }
}