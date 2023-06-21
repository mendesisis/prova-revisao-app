import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import CountryEntity from "../country-entities";
import { Image } from   'expo-image';
export default function HomePage() {

    const [countries, setCountries] = useState<CountryEntity[]>([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET'
        };
        let countryList: CountryEntity[] = [];

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.map(item => {                    
                    countryList.push({
                        id: item.name.common,
                        flagUrl: item.flags.svg,
                        name: item.name.common,
                        ptName: item.translations.por.common,
                        population: item.population,
                    });
                })

            })
            .catch(error => console.log('error', error));

        setCountries(countryList);
    }, []);
    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Países</Text>
            <FlatList
                renderItem={(country) =>
                    <View id={country.item.id} style={styles.card}>
                        <View>
                           <Image source={{uri:country.item.flagUrl}} style={styles.flag} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>{country.item.name}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', fontStyle: "italic" }}>{country.item.ptName}</Text>
                            <Text>População: {country.item.population}</Text>
                        </View>
                    </View>
                }
                data={countries}
                keyExtractor={item => item.id.toString()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 50
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 30

    },
    card: {
        width: '90%',
        height: 100,
        aspectRatio: 3.5,
        backgroundColor: 'white',
        elevation: 15,
        shadowColor: 'black',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 16,
        flexDirection: 'row'

    },
    flag: {
        width: 70,
        height: 70,
        marginLeft: 17,
        marginRight:17
    }

})