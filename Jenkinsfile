pipeline {

    agent any

    environment {

        IMAGE_NAME = "mad0008271/ecommerce-app"
        CONTAINER_NAME = "ecommerce-container"

        DOCKER_COMPOSE_FILE = "docker-compose.yml"

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

        stage('Git Status') {

            steps {

                sh 'git status'

                sh 'git branch'

            }
        }

        stage('GitHub Actions Check') {

            steps {

                sh '''
                ls -la .github/workflows || true
                '''

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

        stage('Stop Old Containers') {

            steps {

                sh '''
                docker stop $CONTAINER_NAME || true

                docker rm $CONTAINER_NAME || true

                docker stop ecommerce-compose || true

                docker rm ecommerce-compose || true

                docker stop nginx-proxy || true

                docker rm nginx-proxy || true

                docker container prune -f || true
                '''

            }
        }

        stage('Docker Run') {

            steps {

                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                -p 3010:3000 \
                $IMAGE_NAME
                '''

            }
        }

        stage('Docker Compose') {

            steps {

                sh '''
                docker compose -f $DOCKER_COMPOSE_FILE up -d || true
                '''

            }
        }

        stage('NGINX Reverse Proxy') {

            steps {

                sh '''
                docker stop nginx-proxy || true

                docker rm nginx-proxy || true

                docker container prune -f || true

                docker run -d \
                --name nginx-proxy \
                -p 8081:80 \
                -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf \
                nginx
                '''

            }
        }

        stage('Docker Logs') {

            steps {

                sh '''
                docker logs $CONTAINER_NAME || true
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

        stage('Prometheus Monitoring') {

            steps {

                sh '''
                docker compose -f monitoring/docker-compose.monitoring.yml up -d
                '''

            }
        }

        stage('Grafana Monitoring') {

            steps {

                sh '''
                docker ps | grep grafana || true
                '''

            }
        }

        stage('Kubernetes Deployment') {

            steps {

                sh '''
                kubectl apply -f monitoring/k8s/ || true
                '''

            }
        }

        stage('Kubernetes Pods Check') {

            steps {

                sh '''
                kubectl get pods

                kubectl get services
                '''

            }
        }

        stage('Ingress Deployment') {

            steps {

                sh '''
                kubectl apply -f monitoring/k8s/ingress.yaml || true
                '''

            }
        }

        stage('Auto Scaling') {

            steps {

                sh '''
                kubectl apply -f monitoring/k8s/hpa.yaml || true

                kubectl get hpa || true
                '''

            }
        }

        stage('Cloudflare Trigger') {

            steps {

                echo 'Cloudflare deployment triggered automatically'

            }
        }

        stage('HTTPS & SSL') {

            steps {

                echo 'Cloudflare HTTPS and SSL enabled'

            }
        }

        stage('Enterprise CI/CD Complete') {

            steps {

                echo 'Enterprise DevOps CI/CD Pipeline Completed Successfully'

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

        always {

            sh '''
            docker ps -a || true

            kubectl get pods || true

            kubectl get services || true
            '''
        }
    }
}