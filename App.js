import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filmes:[],
      loading: true
    };
    
    fetch('https://filmespy.herokuapp.com/api/v1/filmes') //get data
      .then((r)=> r.json()) //transform in json
      .then((json)=>{              //give me the result
          let state = this.state;
          state.filmes = json.filmes;
          state.loading = false;
          this.setState(state);
      });
  }


  render() {

    if(this.state.loading){
      return(
        <View style={[styles.container, styles.loading]}>
          <Text style={styles.loadingTxt}>Carregando...</Text>
        </View>
      );
    }else {
    return (
      <View style={styles.container}>
        <FlatList 
              data={this.state.filmes} 
              renderItem={({item}) => <Filme data={item}/>}
              keyExtractor={(item,index) => index.toString()}
              />
      </View>
     );
   }
  }
}

class Filme extends Component{
  render (){
    return(
      <View style={styles.containerFilme}>
          <Image source={{uri:this.props.data.poster.replace('http.', 'https.')}} style={styles.capaFilme}/>
            <View style={styles.filmeInfo}>
                <Text style={styles.nomeFilme}>{this.props.data.titulo}</Text>
                <Text>{this.props.data.data}</Text>
                <Text>{this.props.data.genero}</Text>    
                <Text>{this.props.data.sinopse}</Text>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      marginTop:10,
      flex: 1
    },
    containerFilme:{
      flex:1,
      flexDirection: 'row',
      margin: 10
      
    },
    capaFilme:{
      width: 80,
      height: 110
    },
    filmeInfo:{
      flex:1,
      flexDirection: 'column',
      marginLeft: 10,
    },
    nomeFilme:{
      fontSize: 18,
      fontWeight: 'bold'
    },
    loading:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingTxt:{
      fontSize: 18,
      fontWeight: 'bold'  
    }
  })


//Aprendendo a realizar requisições externas, exibindo as mesmas em uma flatlist. 
// Estou utilizando uma api contendo informações sobre filmes (http://filmespy.herokuapp.com/api/v1/filmes).